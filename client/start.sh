#!/usr/bin/env bash
set -euo pipefail
echo "Installing client deps (if needed) and starting dev server"
npm install
npm run dev
