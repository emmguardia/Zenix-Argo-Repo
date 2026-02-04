#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACK_TAG="zenix-backend:$TIMESTAMP"
FRONT_TAG="zenix-front:$TIMESTAMP"
BACK_LATEST="zenix-backend:latest"
FRONT_LATEST="zenix-front:latest"

IMAGES_DIR="$PROJECT_ROOT/Images"
mkdir -p "$IMAGES_DIR"
chmod 755 "$IMAGES_DIR" 2>/dev/null || true

TEMP_BACK_TAR="/tmp/zenix-backend-$$.tar"
TEMP_FRONT_TAR="/tmp/zenix-front-$$.tar"

cleanup_on_error() {
    echo ""
    echo "❌ Erreur lors du déploiement !"
    sudo rm -f "$TEMP_BACK_TAR" "$TEMP_FRONT_TAR" 2>/dev/null || true
    exit 1
}

trap cleanup_on_error ERR

echo "🔨 Étape 1/4 : Build des images Docker avec versioning..."

if [ -d "Backend" ]; then
    cd Backend
elif [ -d "backend" ]; then
    cd backend
else
    echo "❌ Dossier backend/Backend introuvable"
    exit 1
fi
sudo docker build --no-cache -t "$BACK_TAG" -t "$BACK_LATEST" . >/dev/null 2>&1 || {
    echo "❌ Erreur lors du build du backend"
    exit 1
}
cd ..

cd Frontend
if [ ! -d "node_modules" ]; then
    npm install --silent >/dev/null 2>&1 || {
        echo "❌ Erreur lors de l'installation des dépendances"
        exit 1
    }
fi
npm run build >/dev/null 2>&1 || {
    echo "❌ Erreur lors de la compilation du frontend"
    exit 1
}
sudo docker build --no-cache -t "$FRONT_TAG" -t "$FRONT_LATEST" . >/dev/null 2>&1 || {
    echo "❌ Erreur lors du build de l'image Docker"
    exit 1
}
cd ..

echo "📦 Étape 2/4 : Export et import des images dans K3s..."

rm -f "$IMAGES_DIR"/k3s-zenix-back*.tar "$IMAGES_DIR"/k3s-zenix-front*.tar 2>/dev/null || true

sudo docker save "$BACK_TAG" -o "$TEMP_BACK_TAR" >/dev/null 2>&1 || {
    echo "❌ Erreur lors de l'export du backend"
    exit 1
}

sudo docker save "$FRONT_TAG" -o "$TEMP_FRONT_TAR" >/dev/null 2>&1 || {
    echo "❌ Erreur lors de l'export du frontend"
    exit 1
}

sudo k3s ctr images import "$TEMP_BACK_TAR" >/dev/null 2>&1 || {
    echo "❌ Erreur lors de l'import du backend"
    exit 1
}

sudo k3s ctr images import "$TEMP_FRONT_TAR" >/dev/null 2>&1 || {
    echo "❌ Erreur lors de l'import du frontend"
    exit 1
}

echo "📋 Étape 3/4 : Mise à jour des configurations K3s..."

sed -i.bak "s|image: zenix-backend:.*|image: $BACK_TAG|g" K3s/zenix-backend.yaml
sed -i.bak "s|image: zenix-front:.*|image: $FRONT_TAG|g" K3s/zenix.yaml

kubectl apply -f K3s/zenix-backend.yaml >/dev/null 2>&1 || {
    echo "❌ Erreur lors de l'application de la configuration backend"
    exit 1
}

kubectl apply -f K3s/zenix.yaml >/dev/null 2>&1 || {
    echo "❌ Erreur lors de l'application de la configuration frontend"
    exit 1
}

rm -f K3s/zenix-backend.yaml.bak K3s/zenix.yaml.bak || true

echo "⏳ Étape 4/4 : Attente de la disponibilité des nouveaux pods..."

if ! kubectl rollout status deployment/zenix-backend -n zenix --timeout=180s >/dev/null 2>&1; then
    echo "❌ Le déploiement backend a échoué"
    kubectl rollout undo deployment/zenix-backend -n zenix >/dev/null 2>&1 || true
    exit 1
fi

if ! kubectl rollout status deployment/zenix-web -n zenix --timeout=180s >/dev/null 2>&1; then
    echo "❌ Le déploiement frontend a échoué"
    kubectl rollout undo deployment/zenix-web -n zenix >/dev/null 2>&1 || true
    exit 1
fi

kubectl get replicaset -n zenix --no-headers 2>/dev/null | while read line; do
    rs=$(echo "$line" | awk '{print $1}' | sed 's/replicaset\.apps\///')
    desired=$(echo "$line" | awk '{print $2}')
    current=$(echo "$line" | awk '{print $3}')
    ready=$(echo "$line" | awk '{print $4}')
    if [ "$desired" = "0" ] && [ "$current" = "0" ] && [ "$ready" = "0" ]; then
        kubectl delete replicaset "$rs" -n zenix --ignore-not-found=true >/dev/null 2>&1 || true
    fi
done

OLD_IMAGES=$(sudo docker images | grep -E "zenix-(back|front)" | grep -v "$TIMESTAMP" | grep -v "latest" | awk '{print $1":"$2}' || true)
if [ -n "$OLD_IMAGES" ]; then
    echo "$OLD_IMAGES" | while read img; do
        if [ -n "$img" ]; then
            sudo docker rmi "$img" >/dev/null 2>&1 || true
        fi
    done
fi

ALL_IMAGES=$(sudo k3s ctr images list 2>/dev/null)
BACK_IMAGE_NAME=$(echo "$ALL_IMAGES" | grep -iE "zenix.*backend|zenix-backend" | grep "$TIMESTAMP" | awk '{print $1}' | head -1)
if [ -z "$BACK_IMAGE_NAME" ]; then
    BACK_IMAGE_NAME=$(echo "$ALL_IMAGES" | grep -iE "zenix.*backend|zenix-backend" | grep -i "latest" | awk '{print $1}' | head -1)
fi

FRONT_IMAGE_NAME=$(echo "$ALL_IMAGES" | grep -iE "zenix.*front|zenix-front" | grep "$TIMESTAMP" | awk '{print $1}' | head -1)
if [ -z "$FRONT_IMAGE_NAME" ]; then
    FRONT_IMAGE_NAME=$(echo "$ALL_IMAGES" | grep -iE "zenix.*front|zenix-front" | grep -i "latest" | awk '{print $1}' | head -1)
fi

if [ -n "$BACK_IMAGE_NAME" ]; then
    sudo k3s ctr images export "$IMAGES_DIR/k3s-zenix-backend.tar" "$BACK_IMAGE_NAME" >/dev/null 2>&1 || true
    if [ -f "$IMAGES_DIR/k3s-zenix-backend.tar" ]; then
        sudo chown $USER:$USER "$IMAGES_DIR/k3s-zenix-backend.tar" 2>/dev/null || true
    fi
fi

if [ -n "$FRONT_IMAGE_NAME" ]; then
    sudo k3s ctr images export "$IMAGES_DIR/k3s-zenix-front.tar" "$FRONT_IMAGE_NAME" >/dev/null 2>&1 || true
    if [ -f "$IMAGES_DIR/k3s-zenix-front.tar" ]; then
        sudo chown $USER:$USER "$IMAGES_DIR/k3s-zenix-front.tar" 2>/dev/null || true
    fi
fi

OLD_BACK_IMAGES=$(echo "$ALL_IMAGES" | grep -iE "zenix.*backend|zenix-backend" | grep -v "$TIMESTAMP" | grep -v "latest" | awk '{print $1}' || true)
if [ -n "$OLD_BACK_IMAGES" ]; then
    echo "$OLD_BACK_IMAGES" | while read img; do
        if [ -n "$img" ]; then
            sudo k3s ctr images rm "$img" >/dev/null 2>&1 || true
        fi
    done
fi

OLD_FRONT_IMAGES=$(echo "$ALL_IMAGES" | grep -iE "zenix.*front|zenix-front" | grep -v "$TIMESTAMP" | grep -v "latest" | awk '{print $1}' || true)
if [ -n "$OLD_FRONT_IMAGES" ]; then
    echo "$OLD_FRONT_IMAGES" | while read img; do
        if [ -n "$img" ]; then
            sudo k3s ctr images rm "$img" >/dev/null 2>&1 || true
        fi
    done
fi

sudo rm -f "$TEMP_BACK_TAR" "$TEMP_FRONT_TAR" 2>/dev/null || true

echo ""
echo "✅ Déploiement terminé avec succès !"
echo "📌 Versions déployées:"
echo "   - Backend: $BACK_TAG"
echo "   - Frontend: $FRONT_TAG"
