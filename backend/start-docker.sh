#!/usr/bin/env bash
set -euo pipefail
if ! command -v docker >/dev/null 2>&1; then
  echo "docker not found. Please install Docker Desktop and retry." >&2
  exit 2
fi

echo "Starting MongoDB via docker compose..."
docker compose up -d
echo "Mongo started. Start backend with: cd backend && npm run dev"
