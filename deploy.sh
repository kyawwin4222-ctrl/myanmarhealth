#!/usr/bin/env bash
set -e

echo "=========================================="
echo "🚀 Myanmar Health Auto-Deployment Started"
echo "=========================================="

# 1. Ensure Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker and Docker Compose plugin..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm -f get-docker.sh
    systemctl enable --now docker
fi

# 2. Pull latest code from GitHub
echo "📥 Pulling latest updates from Git repository..."
git fetch --all
git reset --hard origin/main || git reset --hard origin/master
git pull

# 3. Build and restart Docker containers
echo "🐳 Rebuilding and starting Docker containers (App + PostgreSQL)..."
docker compose down || true
docker compose up -d --build --remove-orphans

# 4. Show status
echo "✅ Deployment Successful!"
docker compose ps
