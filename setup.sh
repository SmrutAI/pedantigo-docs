#!/bin/bash
# Setup script for local development
# Clones or updates repos for local testing

set -e

PEDANTIGO_DIR="pedantigo"
PEDANTIGO_REPO="https://github.com/SmrutAI/pedantigo.git"

BENCHMARKS_DIR="pedantigo-benchmarks"
BENCHMARKS_REPO="https://github.com/SmrutAI/pedantigo-benchmarks.git"

# Clone/update pedantigo
if [ -d "$PEDANTIGO_DIR" ]; then
    echo "Updating existing pedantigo repo..."
    cd "$PEDANTIGO_DIR" && git pull origin main && cd ..
else
    echo "Cloning pedantigo repo..."
    git clone --depth 1 "$PEDANTIGO_REPO" "$PEDANTIGO_DIR"
fi

# Clone/update pedantigo-benchmarks
if [ -d "$BENCHMARKS_DIR" ]; then
    echo "Updating existing pedantigo-benchmarks repo..."
    cd "$BENCHMARKS_DIR" && git pull origin main && cd ..
else
    echo "Cloning pedantigo-benchmarks repo..."
    git clone --depth 1 "$BENCHMARKS_REPO" "$BENCHMARKS_DIR"
fi

# Copy benchmark report to current docs only
# (versioned docs have their own placeholder benchmarks.md)
cp "$BENCHMARKS_DIR/BENCHMARK.md" "$PEDANTIGO_DIR/docs/benchmarks.md" || echo "Note: No BENCHMARK.md found yet"

echo "Done! Run 'npm start' to start the dev server."