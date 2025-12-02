#!/bin/bash
set -e

echo "---------------------------------------------------"
echo " Nettoyage des anciennes pages légales (legacy)    "
echo "---------------------------------------------------"

BASE_DIR="/home/admincmx/projects/casametrix-ui/src/pages/legal"

FILES=(
    "$BASE_DIR/CGV.tsx"
    "$BASE_DIR/Mentions.tsx"
    "$BASE_DIR/Privacy.tsx"
)

for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        echo "[SUPPRESSION] $FILE"
        sudo rm -f "$FILE"
    else
        echo "[SKIP] $FILE introuvable"
    fi
done

echo "---------------------------------------------------"
echo " Nettoyage terminé avec succès."
echo "---------------------------------------------------"
