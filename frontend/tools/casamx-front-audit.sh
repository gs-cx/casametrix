#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Casametrix Front Audit + Snapshot Projet
# ============================================================================
# - Build du front (tsc + vite)
# - Audit des routes (App.tsx)
# - Vérification PageMeta + path sur les pages principales
# - Génération d'un snapshot texte complet du projet à l'instant T :
#   * Contexte projet (prompt, étape, difficultés) depuis tools/casamx-project-context.txt
#   * Log détaillé de l'audit
# ============================================================================

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_FILE="$PROJECT_DIR/src/App.tsx"

REPORT_DIR="$PROJECT_DIR/tools/reports"
mkdir -p "$REPORT_DIR"
TS="$(date '+%Y%m%d-%H%M%S')"
REPORT_FILE="$REPORT_DIR/casamx-front-snapshot-${TS}.txt"
LATEST_FILE="$REPORT_DIR/casamx-front-snapshot-latest.txt"

CONTEXT_FILE="$PROJECT_DIR/tools/casamx-project-context.txt"

# On duplique tout ce qui est affiché à l'écran dans le fichier de snapshot
exec > >(tee "$REPORT_FILE") 2>&1

echo "=== Casametrix Front Snapshot ==="
echo "Date        : $(date '+%Y-%m-%d %H:%M:%S')"
echo "Projet      : Casametrix UI"
echo "Racine git  : $PROJECT_DIR"
echo

# ----------------------------------------------------------------------------
# Contexte projet (prompt, étape, difficultés)
# ----------------------------------------------------------------------------
echo "--- Contexte projet (tools/casamx-project-context.txt) ---"
if [[ -f "$CONTEXT_FILE" ]]; then
  cat "$CONTEXT_FILE"
else
  echo "(Aucun fichier $CONTEXT_FILE trouvé."
  echo " Vous pouvez le créer pour documenter :"
  echo "  - Prompt du projet à l'instant T"
  echo "  - Étape en cours"
  echo "  - Difficultés rencontrées"
  echo ")"
fi
echo
echo "=== Casametrix Front Audit ==="
echo "Dossier projet : $PROJECT_DIR"
echo

WARNINGS=0
ERRORS=0

# ============================================================================
# Étape 1 : build TypeScript/React
# ============================================================================
echo "--- Étape 1 : build TypeScript/React ---"
(
  cd "$PROJECT_DIR"
  echo
  npm run build
) || {
  echo
  echo "[ERREUR] Échec du build front (npm run build)."
  ERRORS=$((ERRORS + 1))
  echo
  echo "=== Résultat audit front (routes/pages/droits) ==="
  echo "Warnings : $WARNINGS"
  echo "Erreurs  : $ERRORS"
  echo
  echo "[KO] Front Casametrix : build en erreur."
  # Mise à jour du lien latest même en cas d'erreur
  ln -sf "$REPORT_FILE" "$LATEST_FILE"
  exit 1
}

echo

# ============================================================================
# Étape 2 : audit des routes & pages
# ============================================================================
echo "--- Étape 2 : audit des routes & pages ---"
echo "=== Casametrix Front Routes Audit ==="
echo "Fichier App.tsx : $APP_FILE"
echo

if [[ ! -f "$APP_FILE" ]]; then
  echo "[ERREUR] Fichier App.tsx introuvable : $APP_FILE"
  ERRORS=$((ERRORS + 1))
else
  # Extraction très simple des routes : path="..." element={<XXXPage />}
  mapfile -t ROUTE_LINES < <(grep -E 'path="' "$APP_FILE" || true)

  if [[ "${#ROUTE_LINES[@]}" -eq 0 ]]; then
    echo "[WARN] Aucune route détectée dans App.tsx."
    WARNINGS=$((WARNINGS + 1))
  else
    echo "[OK] ${#ROUTE_LINES[@]} route(s) trouvée(s) dans App.tsx."
    for line in "${ROUTE_LINES[@]}"; do
      # Exemple de ligne :
      # <Route path="/search" element={<SearchPage />} />
      path=$(echo "$line" | sed -n 's/.*path="\([^"]*\)".*/\1/p')
      component=$(echo "$line" | sed -n 's/.*element={<\([^ >}]*\).*/\1/p')
      echo "  - path=\"$path\" → component=\"$component\""
    done
    echo
  fi
fi

# Routes attendues et mapping vers les pages
declare -A EXPECTED_ROUTES
EXPECTED_ROUTES["/"]="HomePage"
EXPECTED_ROUTES["/search"]="SearchPage"
EXPECTED_ROUTES["/pricing"]="PricingPage"
EXPECTED_ROUTES["/blog"]="BlogPage"
EXPECTED_ROUTES["/faq"]="FaqPage"
EXPECTED_ROUTES["/login"]="LoginPage"
EXPECTED_ROUTES["/register"]="RegisterPage"

declare -A ROUTE_COMPONENTS

if [[ -f "$APP_FILE" ]]; then
  while IFS= read -r line; do
    path=$(echo "$line" | sed -n 's/.*path="\([^"]*\)".*/\1/p')
    component=$(echo "$line" | sed -n 's/.*element={<\([^ >}]*\).*/\1/p')
    if [[ -n "$path" && -n "$component" ]]; then
      ROUTE_COMPONENTS["$path"]="$component"
    fi
  done < <(grep -E 'path="' "$APP_FILE" || true)
fi

echo "--- Vérification des routes attendues ---"
for expected_path in "${!EXPECTED_ROUTES[@]}"; do
  expected_component="${EXPECTED_ROUTES[$expected_path]}"
  actual_component="${ROUTE_COMPONENTS[$expected_path]:-}"

  if [[ -z "$actual_component" ]]; then
    echo "[WARN] Route \"$expected_path\" manquante dans App.tsx (attendu : component=\"$expected_component\")."
    WARNINGS=$((WARNINGS + 1))
  else
    if [[ "$actual_component" == "$expected_component" ]]; then
      echo "[OK] Route \"$expected_path\" correctement reliée à \"$expected_component\"."
    else
      echo "[WARN] Route \"$expected_path\" reliée à \"$actual_component\" (attendu : \"$expected_component\")."
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
done

# Fallback *
if grep -q 'path="\*"' "$APP_FILE" 2>/dev/null; then
  echo "[OK] Route fallback \"*\" détectée (utilisée comme catch-all)."
else
  echo "[WARN] Aucune route fallback \"*\" détectée dans App.tsx."
  WARNINGS=$((WARNINGS + 1))
fi

echo

# ============================================================================
# Vérification des pages, PageMeta et droits
# ============================================================================
echo "--- Vérification des pages, PageMeta et droits ---"

# mapping path -> fichier page
declare -A PATH_TO_PAGE
PATH_TO_PAGE["/"]="$PROJECT_DIR/src/pages/HomePage.tsx"
PATH_TO_PAGE["/search"]="$PROJECT_DIR/src/pages/SearchPage.tsx"
PATH_TO_PAGE["/pricing"]="$PROJECT_DIR/src/pages/PricingPage.tsx"
PATH_TO_PAGE["/blog"]="$PROJECT_DIR/src/pages/BlogPage.tsx"
PATH_TO_PAGE["/faq"]="$PROJECT_DIR/src/pages/FaqPage.tsx"
PATH_TO_PAGE["/login"]="$PROJECT_DIR/src/pages/LoginPage.tsx"
PATH_TO_PAGE["/register"]="$PROJECT_DIR/src/pages/RegisterPage.tsx"

for expected_path in "${!PATH_TO_PAGE[@]}"; do
  page_file="${PATH_TO_PAGE[$expected_path]}"

  if [[ ! -f "$page_file" ]]; then
    echo "[WARN] Fichier de page manquant pour path=\"$expected_path\" : $page_file"
    WARNINGS=$((WARNINGS + 1))
    continue
  fi

  # Vérifier qu'on voit bien PageMeta
  if ! grep -q "PageMeta" "$page_file"; then
    echo "[WARN] Page \"$page_file\" : aucune occurrence de \"PageMeta\" trouvée (import ou utilisation manquants ?)."
    WARNINGS=$((WARNINGS + 1))
    continue
  fi

  # Vérifier qu'on trouve un pattern <PageMeta ... path="...">
  has_correct_path=$(grep -E "<PageMeta[^>]*path=\"${expected_path}\"" "$page_file" || true)
  if [[ -z "$has_correct_path" ]]; then
    echo "[WARN] Page \"$page_file\" : aucun <PageMeta ... path=\"${expected_path}\"> trouvé."
    WARNINGS=$((WARNINGS + 1))
  else
    echo "[OK] Page \"$page_file\" : <PageMeta ... path=\"${expected_path}\"> détecté."
  fi
done

echo
echo "=== Résultat audit front (routes/pages/droits) ==="
echo "Warnings : $WARNINGS"
echo "Erreurs  : $ERRORS"
echo

if [[ "$ERRORS" -eq 0 ]]; then
  echo "[OK] Routes, pages et configuration d'accès Casametrix OK (aucune erreur bloquante)."
else
  echo "[KO] Des erreurs bloquantes ont été détectées sur le front Casametrix."
fi

# Met à jour le lien vers le dernier snapshot
ln -sf "$REPORT_FILE" "$LATEST_FILE"

echo
echo "[INFO] Snapshot écrit dans : $REPORT_FILE"
echo "[INFO] Dernier snapshot :  $LATEST_FILE"
