#!/bin/bash

# Nom du fichier de sortie
output_file="resultat.txt"

# Vider le fichier de sortie s'il existe déjà
> "$output_file"

# Parcourir tous les fichiers en excluant les dossiers et fichiers spécifiés
find . -type f \
    ! -path "*/node_modules/*" \
    ! -path "*/.git/*" \
    ! -path "*/.nuxt/*" \
    ! -name "make" \
    ! -name "package-lock.json" \
    ! -name ".git*" \
    ! -name "script.sh" \
    ! -name "resultat.txt" \
    ! -name ".gitignore" \
    ! -name "Makefile" \
    ! -name "README.md" \
    ! -name ".prettierrc" \
    ! -name "Tutorial.vue" \
    ! -name "NuxtLogo.vue" \
    ! -iname "*.jpg" \
    ! -iname "*.jpeg" \
    ! -iname "*.png" \
    ! -iname "*.gif" \
    ! -iname "*.bmp" \
    ! -iname "*.tif" \
    ! -iname "*.tiff" \
    ! -iname "*.svg" \
    ! -iname "*.ico" \
    ! -iname "*.icns" \
    ! -iname "*.webp" \
    ! -iname "*.heic" | while read -r file; do
    # Chemin relatif du fichier
    relative_path="${file#./}"

    # Titre (nom du fichier)
    title="$(basename "$file")"

    # Contenu du fichier
    content="$(cat "$file")"

    # Écrire les informations dans le fichier de sortie
    echo "Chemin : $relative_path" >> "$output_file"
    echo "Titre : $title" >> "$output_file"
    echo "Contenu :" >> "$output_file"
    echo "$content" >> "$output_file"
    echo "----------------------------------" >> "$output_file"
done