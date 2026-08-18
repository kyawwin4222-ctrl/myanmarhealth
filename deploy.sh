#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/myanmar-health}"
BRANCH="${BRANCH:-main}"

if docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE=(docker-compose)
else
  echo "Docker Compose is not installed" >&2
  exit 1
fi

cd "$APP_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"
if [ "${COMPOSE[0]}" = "docker-compose" ]; then
  docker ps -aq --filter name=myanmarhealth_app | xargs -r docker rm -f
fi
"${COMPOSE[@]}" up -d --build --remove-orphans
docker image prune -f
"${COMPOSE[@]}" ps
