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
- **Workflow « Corriger les CVE et redéployer »** (`.github/workflows/fix-cve.yml`), déclenché à la main depuis l'onglet Actions : met à jour les dépendances, reconstruit les images depuis des bases fraîches (`--pull`), rejoue audit, lint, typecheck et tests, scanne avec Trivy, et ne publie que si tout est propre. Dependabot a été retiré au profit de ce déclenchement manuel : les mises à jour partent quand elles sont décidées, pas au fil d'une file de PR à traiter.
- **`pnpm` lockfile strict** (`--frozen-lockfile`) : tout déploiement est reproductible bit-à-bit ; un attaquant ne peut pas glisser une dépendance en arrière-plan.
- **Trivy scan AVANT push** sur les images Docker : une image vulnérable (CVE HIGH ou CRITICAL avec fix dispo) ne part jamais sur GHCR.
- **`pnpm audit --prod --audit-level high` bloquant** sur Backend et Frontend : une CVE HIGH sur une dépendance de production fait échouer le build. Les exceptions se déclarent explicitement, avec justification, dans `pnpm.auditConfig.ignoreGhsas`.

#### Exceptions d'audit en cours

| Advisory | Paquet | Pourquoi elle est ignorée |
|---|---|---|
| [GHSA-qwww-vcr4-c8h2](https://github.com/advisories/GHSA-qwww-vcr4-c8h2) | `react-router` | Contournement CSRF **du mode RSC** (React Server Components). Le site est une SPA purement cliente (`BrowserRouter`), sans RSC ni server actions : le code vulnérable n'est jamais atteint. Le correctif n'existe qu'en v8, où `react-router-dom` disparaît au profit d'imports directs — une migration à mener à froid, pas en correctif de sécurité. À réévaluer si le site passe un jour en rendu serveur. |

### Runtime (production)

- **Hébergement K3s** sur infrastructure dédiée en France.
- **Conteneurs non-root** : backend en uid 10000 (image et `securityContext` alignés), frontend en uid 101 via l'image `nginx-unprivileged`, qui écoute sur 8080. `runAsNonRoot`, `allowPrivilegeEscalation: false`, `capabilities: drop ALL` et `seccompProfile: RuntimeDefault` sur les deux déploiements.
- **Sealed Secrets** : les secrets en clair ne sont jamais commités, uniquement leur version chiffrée par la clé du cluster. Aucun kubeconfig n'est exposé à la CI : le workflow de build n'accède pas au cluster.
- **TLS terminé en bordure par Cloudflare** (l'IngressRoute Traefik n'expose que l'entrypoint `web` en interne).
- **WAF Cloudflare + protection anti-DDoS** en bordure, et bouncer CrowdSec en middleware Traefik.
- **Headers de sécurité** : CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy et COOP/CORP servis par nginx. Le CSP est vérifié au build (`nginx -t`) et présent sur *toutes* les réponses, y compris `/api/`, les assets statiques et les 404.
- **CSP sans `'unsafe-inline'` sur `script-src`** : la page ne contient plus aucun script inline exécutable. Les deux qui l'imposaient — le correctif anti-Umami d'`index.html` et l'attribut `onload=` posé sur les `<link>` CSS par le plugin `css-async` — ont été supprimés. `img-src` et `frame-ancestors` ont été resserrés dans la foulée (`'self' data:` et `'none'`).
- **HSTS** : posé en bordure par Cloudflare (`max-age=15552000; includeSubDomains`). Le middleware Traefik déclare des valeurs plus élevées, mais Cloudflare les écrase — la source de vérité est le tableau de bord Cloudflare, pas le chart Helm.
- **Sauvegardes quotidiennes chiffrées** avec rétention 30 jours, répliquées sur deux sites ; copie hors infrastructure Zenix disponible en option.

> **Limite connue du CSP** : `script-src` conserve `'unsafe-inline'`, nécessaire tant que le chargement CSS asynchrone repose sur un attribut `onload=` inline (voir `vite.config.ts`, plugin `css-async`) et que `index.html` embarque un script inline. Le passage à des fichiers externes ou à des hash CSP permettra de le retirer. `'unsafe-eval'`, lui, a été supprimé.

### Code

- **ESLint** bloquant sur chaque push, avec `typescript-eslint`.
- **Typecheck TypeScript** bloquant (`tsc --noEmit`) : le build Vite ne vérifie pas les types, cette étape est donc le seul garde-fou.
- **Code review** systématique sur les contributions externes.
- **Validation de la config nginx au build** (`nginx -t`) : une erreur de syntaxe fait échouer l'image avant tout push GHCR.

### Données

> **Périmètre.** Cette section décrit le **site vitrine** (`zenixweb.fr`). L'espace
> client (`app.zenixweb.fr`, dépôt `Zenix-App-Argo-Repo`) a ses propres
> traitements et ses propres sous-traitants — Stripe, Cloudflare R2, Discord —
> qui ne sont pas couverts ici. Ne pas lire ce document comme s'appliquant à
> l'ensemble de l'infrastructure.

- **Données stockées en UE** (France).
- **Un seul transfert hors UE, assumé et documenté** : Cloudflare, Inc.
  (États-Unis) est en frontal du site et traite les données de connexion des
  visiteurs (adresse IP) au titre de la protection anti-DDoS et du pare-feu
  applicatif. Encadré par les clauses contractuelles types de la Commission
  européenne, et déclaré dans les [mentions légales](https://zenixweb.fr/mentions-legales)
  et la [politique de confidentialité](https://zenixweb.fr/politique-confidentialite).
  Ce document affirmait auparavant « aucune transmission vers les USA », ce que
  la présence de Cloudflare contredisait.
- **Polices auto-hébergées** (`@fontsource-variable/inter`) : le site appelait
  Google Fonts, ce qui transmettait l'adresse IP de chaque visiteur à Google
  avant tout consentement. Supprimé.
- **Analytics sans cookie** (Umami self-hosted) : aucun bandeau de consentement
  requis, aucune donnée envoyée à un tiers.
- **Anti-spam du formulaire de contact** : champ honeypot invisible + limitation à 5 envois par heure et par IP, côté backend. Volontairement sans reCAPTCHA, pour ne pas transmettre de données de navigation à Google sur un site qui revendique l'absence de traceurs tiers.
- **Aucune donnée personnelle dans les logs applicatifs** (les adresses e-mail invalides ne sont plus journalisées).

## Compromission supply-chain : que faire si une CVE critique est publiée

Le point d'entrée est le workflow **« Corriger les CVE et redéployer »**, dans l'onglet Actions. Il fait la chaîne complète en une exécution : mise à jour, rebuild, tests, scan Trivy, publication et déploiement — et il s'arrête avant toute publication si le scan n'est pas propre.

1. **CVE dans une dépendance npm** — lancer le workflow en `patch-et-mineur`. Cette stratégie respecte les plages semver de `package.json` et couvre l'immense majorité des correctifs.
2. **Le correctif n'existe qu'en version majeure** — relancer en `majeures-incluses` (`pnpm update --latest`). Le lint, le typecheck et les tests tournent avant toute publication : une rupture d'API fait échouer le workflow, elle ne part pas en production.
3. **CVE dans `node`, `nginx` ou Alpine** — lancer en `images-de-base-seules`. Aucune dépendance n'est touchée, les images sont simplement reconstruites avec `--pull`, ce qui récupère les correctifs système.
4. **Vérifier avant d'appliquer** — décocher `deployer` pour un essai à blanc : tests et scan tournent, rien n'est publié.
5. **Cas résiduel** — si une version reste imposée par une dépendance transitive, l'épingler via `pnpm.overrides` dans `package.json`, puis relancer le workflow.

Les exceptions justifiées se déclarent dans `pnpm.auditConfig.ignoreGhsas`, avec leur motif documenté dans le tableau ci-dessus.

## Hors-scope

- Attaques DoS / volumétriques sur l'infrastructure (gérées par Cloudflare).
- Tests sur le site de prod sans accord préalable.
- Recherches de fingerprinting / OSINT sur l'identité du mainteneur.
- Vulnérabilités dans les dépendances tierces déjà signalées publiquement et en attente du fix upstream (mais merci de me prévenir si vous avez un workaround).

## Contact

- Email : contact@zenixweb.fr
- LinkedIn : [Enzo Monnet Mata](https://www.linkedin.com/in/enzo-monnet-mata-3a1888378/)

Merci de m'aider à garder Zenix sûr.
