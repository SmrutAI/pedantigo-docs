#!/bin/bash
# Setup script for local development
# Clones or updates the pedantigo repo for local testing

set -e

PEDANTIGO_DIR="pedantigo"
REPO_URL="https://github.com/SmrutAI/pedantigo.git"

if [ -d "$PEDANTIGO_DIR" ]; then
    echo "Updating existing pedantigo repo..."
    cd "$PEDANTIGO_DIR"
    git pull origin main
    cd ..
else
    echo "Cloning pedantigo repo..."
    git clone --depth 1 "$REPO_URL" "$PEDANTIGO_DIR"
fi

echo "Done! Run 'npm start' to start the dev server."
