#!/bin/sh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."

ROOT_ENV="$SCRIPT_DIR/../../.env"
if [ -f "$ROOT_ENV" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ROOT_ENV"
  set +a
fi

npx ts-node -r tsconfig-paths/register scripts/migrate-project-images.ts "$@"
