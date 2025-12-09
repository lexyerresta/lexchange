#!/bin/bash

# Auto commit and push script for Lexchange

echo "Adding all changes..."
git add .

echo "Enter commit message (or press Enter for default):"
read commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

echo "Committing with message: $commit_msg"
git commit -m "$commit_msg"

echo "Pushing to origin main..."
git push origin main

echo "Done!"
