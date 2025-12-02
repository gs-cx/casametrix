#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Casametrix FRONT + API Doctor
# Vérifie l'installation front (React/Vite) & l'API de base.
# À lancer depuis le serveur : ./tools/casamx-front-doctor.sh
# ============================================================

# Détection du projet
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

FRONT_ROOT="${PROJECT_ROOT}"
FRONT_DIST="${FRONT_ROOT}/dist"
WEB_ROOT="/var/www/casametrix.com/html"

API_BASE="https://api.casametrix.com"
FRONT_BASE="https://casametrix.com"

sep() {
  echo "------------------------------------------------------------"
}

title() {
  sep
  echo "$1"
  sep
}

ok() { echo "  [OK]  $1"; }
warn() { echo "  [WARN] $1"; }
err() { echo "  [ERR]  $1"; }

echo
title "Casametrix Doctor - Synthèse installation"
echo "Projet front : ${FRONT_ROOT}"
echo

# ------------------------------------------------------------
# 1) Vérification outils Node / npm / TypeScript / Vite
# ------------------------------------------------------------
title "1) Outils Node / npm / TypeScript / Vite"

if command -v node >/dev/null 2>&1; then
  ok "node présent : $(node -v)"
else
  err "node non trouvé dans le PATH"
fi

if command -v npm >/dev/null 2>&1; then
  ok "npm présent : $(npm -v)"
else
  err "npm non trouvé dans le PATH"
fi

# TypeScript (via npx tsc)
if command -v npx >/dev/null 2>&1; then
  if npx --yes tsc -v >/dev/null 2>&1; then
    TS_VERSION="$(npx --yes tsc -v 2>/dev/null || true)"
    ok "TypeScript (tsc) accessible via npx : ${TS_VERSION}"
  else
    warn "TypeScript (tsc) n'est pas accessible via npx (ou pas dans les devDependencies)"
  fi
else
  err "npx non trouvé dans le PATH"
fi

# Vite
if command -v npx >/dev/null 2>&1; then
  if npx --yes vite --version >/dev/null 2>&1; then
    VITE_VERSION="$(npx --yes vite --version 2>/dev/null || true)"
    ok "Vite accessible via npx : ${VITE_VERSION}"
  else
    warn "Vite n'est pas accessible via npx (ou pas dans les devDependencies)"
  fi
fi

# ------------------------------------------------------------
# 2) Fichiers clés du front
# ------------------------------------------------------------
title "2) Fichiers clés du front"

cd "${FRONT_ROOT}"

check_file() {
  local f="$1"
  if [ -f "$f" ]; then
    ok "Présent : $f"
  else
    err "Manquant : $f"
  fi
}

# Entrées principales
check_file "src/main.tsx"
check_file "src/App.tsx"
check_file "src/components/PageMeta.tsx"

# Pages importantes (home, search, pricing, blog, légales, etc.)
PAGES=(
  "src/pages/HomePage.tsx"
  "src/pages/SearchPage.tsx"
  "src/pages/PricingPage.tsx"
  "src/pages/BlogPage.tsx"
  "src/pages/FaqPage.tsx"
  "src/pages/LoginPage.tsx"
  "src/pages/RegisterPage.tsx"
  "src/pages/LegalPage.tsx"
  "src/pages/CgvPage.tsx"
  "src/pages/PrivacyPage.tsx"
  "src/pages/CookiesPage.tsx"
  "src/pages/DpaPage.tsx"
  "src/pages/AboutPage.tsx"
  "src/pages/SecurityPage.tsx"
  "src/pages/StatusPage.tsx"
  "src/pages/ApiDocsPage.tsx"
  "src/pages/SupportPage.tsx"
  "src/pages/RoadmapPage.tsx"
  "src/pages/ChangelogPage.tsx"
  "src/pages/CaseStudiesPage.tsx"
  "src/pages/DemoPage.tsx"
  "src/pages/IntegrationsPage.tsx"
)

for p in "${PAGES[@]}"; do
  if [ -f "$p" ]; then
    ok "Page présente : $p"
  else
    warn "Page manquante (ou nom différent) : $p"
  fi
done

# ------------------------------------------------------------
# 3) Build local (dist/) et déploiement (web root)
# ------------------------------------------------------------
title "3) Build local (dist/) et répertoire web /var/www"

if [ -d "${FRONT_DIST}" ]; then
  if [ -f "${FRONT_DIST}/index.html" ]; then
    ok "Build local présent : ${FRONT_DIST}/index.html"
  else
    warn "Le répertoire dist existe mais index.html est absent."
  fi
else
  warn "Le répertoire dist n'existe pas encore. (Exécuter npm run build)"
fi

if [ -d "${WEB_ROOT}" ]; then
  ok "Répertoire web root présent : ${WEB_ROOT}"
  if [ -f "${WEB_ROOT}/index.html" ]; then
    ok "index.html présent dans ${WEB_ROOT}"
  else
    warn "Pas de index.html dans ${WEB_ROOT} (rsync non fait ou incorrect)."
  fi
else
  err "Répertoire ${WEB_ROOT} introuvable. Vérifier la config Nginx / déploiement."
fi

# ------------------------------------------------------------
# 4) Vérification FRONT en production (Nginx)
# ------------------------------------------------------------
title "4) Vérification du FRONT en production (Nginx)"

if command -v curl >/dev/null 2>&1; then
  HTTP_CODE_FRONT=$(curl -k -s -o /tmp/casamx_front_check.html -w "%{http_code}" "${FRONT_BASE}" || echo "000")
  echo "  Code HTTP ${FRONT_BASE} : ${HTTP_CODE_FRONT}"

  if [ "${HTTP_CODE_FRONT}" = "200" ]; then
    ok "Le site ${FRONT_BASE} répond en HTTP 200."
    if grep -qi "Casametrix – Plateforme d’intelligence d’adresse" /tmp/casamx_front_check.html; then
      ok "Le <title> semble correct sur ${FRONT_BASE}."
    else
      warn "Le <title> ne contient pas la chaîne attendue sur ${FRONT_BASE}."
    fi

    if grep -qi "@context" /tmp/casamx_front_check.html; then
      ok "Un bloc JSON-LD (@context) est présent sur la home."
    else
      warn "Aucun @context JSON-LD détecté dans le HTML initial."
    fi
  else
    err "Le site ${FRONT_BASE} ne répond pas correctement (HTTP ${HTTP_CODE_FRONT})."
  fi
else
  err "curl n'est pas disponible, impossible de tester le FRONT."
fi

# ------------------------------------------------------------
# 5) Vérification API (health + BAN autocomplete)
# ------------------------------------------------------------
title "5) Vérification de l'API (health + BAN autocomplete)"

if command -v curl >/dev/null 2>&1; then
  # /health
  HTTP_CODE_API_HEALTH=$(curl -k -s -o /tmp/casamx_api_health.json -w "%{http_code}" "${API_BASE}/health" || echo "000")
  echo "  Code HTTP ${API_BASE}/health : ${HTTP_CODE_API_HEALTH}"

  if [ "${HTTP_CODE_API_HEALTH}" = "200" ]; then
    if grep -q '"ok":true' /tmp/casamx_api_health.json; then
      ok "/health renvoie un JSON avec ok=true."
    else
      warn "/health répond en 200 mais sans '\"ok\":true' (à vérifier)."
    fi
  else
    err "L'API /health ne répond pas correctement (HTTP ${HTTP_CODE_API_HEALTH})."
  fi

  # /addresses/ban-autocomplete
  HTTP_CODE_API_BAN=$(curl -k -s -o /tmp/casamx_api_ban.json -w "%{http_code}" "${API_BASE}/addresses/ban-autocomplete?q=Lille&limit=1" || echo "000")
  echo "  Code HTTP ${API_BASE}/addresses/ban-autocomplete : ${HTTP_CODE_API_BAN}"

  if [ "${HTTP_CODE_API_BAN}" = "200" ]; then
    if head -c 1 /tmp/casamx_api_ban.json | grep -q '\['; then
      ok "/addresses/ban-autocomplete renvoie un tableau JSON (au moins)."
    else
      warn "/addresses/ban-autocomplete répond en 200 mais le JSON n'est pas un tableau."
    fi
  else
    err "L'endpoint /addresses/ban-autocomplete ne répond pas correctement (HTTP ${HTTP_CODE_API_BAN})."
  fi
else
  err "curl n'est pas disponible, impossible de tester l'API."
fi

# ------------------------------------------------------------
# 6) Résumé
# ------------------------------------------------------------
title "6) Fin du doctor"

echo "Vérification terminée."
echo "Les [ERR] sont à corriger en priorité, puis les [WARN]."
echo
