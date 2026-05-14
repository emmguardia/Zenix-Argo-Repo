# Security Policy

## Signaler une vulnérabilité

Si vous découvrez une faille de sécurité dans Zenix Web ou son infrastructure, **merci de ne pas ouvrir d'issue publique sur GitHub**. Contactez-moi directement :

- **Email** : contact@zenixweb.fr
- **Objet** : `[SECURITY] <description courte>`

Je m'engage à :

- Accuser réception sous **48 heures ouvrées**
- Confirmer si la vulnérabilité est reproductible sous **7 jours**
- Publier un correctif sous **30 jours** pour une vulnérabilité confirmée HIGH ou CRITICAL
- Vous créditer dans le changelog si vous le souhaitez (mentionnez-le dans votre rapport)

Toute information sensible (clés, données client, dumps de bases) doit être **purgée** de votre rapport.

## Disclosure responsable

- **Pas de tests intrusifs sans accord préalable** (DoS, fuzzing destructeur, exfiltration de données).
- **Pas de publication avant que le correctif soit déployé en production.**
- Le hall of fame n'existe pas encore, mais je crédite avec plaisir dans la release notes.

## Versions supportées

Zenix Web étant un projet à mainteneur unique, **seule la version courante en production est supportée**. Pas de backport sur les versions antérieures. Les correctifs sont déployés via la CI/CD sur la branche `main`.

| Version | Supportée |
|---------|-----------|
| `main` (production) | Oui |
| Toute autre branche / tag antérieur | Non |

## Mesures de sécurité en place

### Supply-chain (dépendances)

- **`minimum-release-age=1440`** (24h) dans `Frontend/.npmrc` et `Backend/.npmrc` : aucun paquet npm publié dans les 24 dernières heures n'est installé, donnant le temps à la communauté de détecter et retirer un paquet compromis avant qu'il ne touche notre supply-chain.
- **`ignore-scripts=true`** : les scripts d'install (`postinstall`, `preinstall`) des dépendances ne s'exécutent pas, neutralisant le vecteur principal de compromission supply-chain.
- **Dependabot hebdomadaire** : groupes prod et dev séparés, auto-merge des patch/minor uniquement, auto-merge bloqué si une CVE est signalée par la CI.
- **`pnpm` lockfile strict** (`--frozen-lockfile`) : tout déploiement est reproductible bit-à-bit ; un attaquant ne peut pas glisser une dépendance en arrière-plan.
- **Trivy scan AVANT push** sur les images Docker : une image vulnérable (CVE HIGH ou CRITICAL avec fix dispo) ne part jamais sur GHCR.

### Runtime (production)

- **Hébergement K3s** sur infrastructure dédiée en France.
- **Conteneurs non-root** : tous les services tournent avec un utilisateur dédié (uid 10000 côté backend, uid `nginx` côté frontend).
- **Sealed Secrets** : les secrets en clair ne sont jamais commités, uniquement leur version chiffrée par la clé du cluster.
- **TLS automatique** via cert-manager + Let's Encrypt.
- **WAF Cloudflare + protection anti-DDoS** en bordure.
- **CSP, HSTS, X-Frame-Options** : headers de sécurité stricts servis par nginx.
- **Sauvegardes quotidiennes chiffrées** avec rétention 30 jours sur datacenter séparé.

### Code

- **ESLint** sur chaque push avec `typescript-eslint` strict.
- **Code review** systématique sur les PRs Dependabot et les contributions externes.
- **Audit pnpm** (`pnpm audit --audit-level high`) dans la CI sur Backend et Frontend.
- **Headers de sécurité validés** au déploiement via les tests d'intégration.

### Données

- **Données stockées en UE** (France, conformité RGPD).
- **Aucune transmission vers les USA** pour les données client.
- **Analytics sans cookie** (Umami self-hosted).
- **reCAPTCHA v3** sur les formulaires sensibles.

## Compromission supply-chain : que faire si une CVE critique est publiée

1. Si la CVE concerne une dépendance directe ou transitive, **Dependabot ouvre une PR** dans la semaine.
2. Si l'urgence est immédiate, je pousse manuellement un fix sur `main` qui :
   - Bump la version vulnérable via `pnpm.overrides` dans `package.json`
   - Régénère `pnpm-lock.yaml`
   - Déclenche la CI qui scan Trivy + push GHCR + ArgoCD redeploy
3. Si la CVE concerne `node`, `nginx`, ou Alpine, je rebuild les images en spécifiant la version corrigée du base image.

## Hors-scope

- Attaques DoS / volumétriques sur l'infrastructure (gérées par Cloudflare).
- Tests sur le site de prod sans accord préalable.
- Recherches de fingerprinting / OSINT sur l'identité du mainteneur.
- Vulnérabilités dans les dépendances tierces déjà signalées publiquement et en attente du fix upstream (mais merci de me prévenir si vous avez un workaround).

## Contact

- Email : contact@zenixweb.fr
- LinkedIn : [Enzo Monnet Mata](https://www.linkedin.com/in/enzo-monnet-mata-3a1888378/)

Merci de m'aider à garder Zenix sûr.
