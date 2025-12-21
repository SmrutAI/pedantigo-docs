#!/bin/bash
# Append new GitHub releases to changelog.md
# Only adds releases that aren't already present - never modifies existing content
#
# Usage: ./scripts/generate-changelog.sh [changelog_path]
# Default: changelog.md (root of pedantigo-docs)

set -e

REPO="SmrutAI/pedantigo"
CHANGELOG_FILE="${1:-changelog.md}"

# Check if gh is available
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) not found."
    exit 1
fi

# Check if changelog exists
if [ ! -f "$CHANGELOG_FILE" ]; then
    echo "Error: Changelog file not found at $CHANGELOG_FILE"
    exit 1
fi

echo "Checking for new releases to add to changelog..."

# Get list of releases from GitHub (newest first)
releases=$(gh release list -R "$REPO" --limit 100 --json tagName,publishedAt | jq -r '.[] | "\(.tagName)|\(.publishedAt)"')

if [ -z "$releases" ]; then
    echo "No releases found or unable to fetch releases."
    exit 0
fi

# Track if we added anything
added_count=0

# Process releases in reverse order (oldest first) so newest ends up at top
# Use tail -r on macOS, tac on Linux
if command -v tac &> /dev/null; then
    releases_reversed=$(echo "$releases" | tac)
else
    releases_reversed=$(echo "$releases" | tail -r)
fi

while IFS='|' read -r tag published_at; do
    [ -z "$tag" ] && continue

    # Remove 'v' prefix for version number
    version="${tag#v}"

    # Check if this version is already in the changelog
    if grep -q "^## \[$version\]" "$CHANGELOG_FILE"; then
        echo "  [$version] already exists, skipping"
        continue
    fi

    echo "  Adding [$version]..."

    # Get release body
    body=$(gh release view "$tag" -R "$REPO" --json body -q '.body')

    # Format date (extract YYYY-MM-DD from ISO timestamp)
    release_date=$(echo "$published_at" | cut -d'T' -f1)

    # Create the new entry in a temp file
    TEMP_FILE=$(mktemp)
    {
        echo ""
        echo "## [$version] - $release_date"
        echo ""
        echo "### Changed"
        echo ""
        # Clean up the body - remove GitHub auto-headers and trailing links
        echo "$body" | \
            sed 's/^## What'\''s Changed$//' | \
            sed 's/\*\*Full Changelog\*\*:.*//' | \
            sed 's/\r//g' | \
            grep -v '^[[:space:]]*$' || true
        echo ""
        echo "---"
    } > "$TEMP_FILE"

    # Find the third "---" which is the content separator after header
    # (1st "---" opens frontmatter, 2nd "---" closes frontmatter, 3rd "---" separates header from releases)
    # Insert new release right after it
    first_separator_line=$(grep -n "^---$" "$CHANGELOG_FILE" | sed -n '3p' | cut -d: -f1)

    if [ -z "$first_separator_line" ]; then
        echo "Error: Could not find header separator (---) in changelog"
        rm -f "$TEMP_FILE"
        exit 1
    fi

    # Insert the new content after the first ---
    head -n "$first_separator_line" "$CHANGELOG_FILE" > "${CHANGELOG_FILE}.new"
    cat "$TEMP_FILE" >> "${CHANGELOG_FILE}.new"
    tail -n +$((first_separator_line + 1)) "$CHANGELOG_FILE" >> "${CHANGELOG_FILE}.new"
    mv "${CHANGELOG_FILE}.new" "$CHANGELOG_FILE"

    rm -f "$TEMP_FILE"
    ((added_count++)) || true

done <<< "$releases_reversed"

if [ $added_count -eq 0 ]; then
    echo "Changelog is up to date - no new releases to add."
else
    echo "Added $added_count new release(s) to changelog."
fi
