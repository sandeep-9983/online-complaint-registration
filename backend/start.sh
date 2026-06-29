chmod +x "$0" 2>/dev/null || true
#!/usr/bin/env bash
set -euo pipefail
# Usage: ./start.sh [memory]
if [ "${1-}" = "memory" ]; then
  echo "Starting backend with mongodb-memory-server enabled"
  export USE_MEMORY_SERVER=true
fi

echo "Starting backend..."
node index.js
