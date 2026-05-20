#!/bin/sh
set -e

printf "Identifiant : "
read IDENTIFIANT

printf "Mot de passe : "
stty -echo
read PASSWORD
stty echo
printf "\n"

if [ -z "$IDENTIFIANT" ] || [ -z "$PASSWORD" ]; then
  echo "Identifiant et mot de passe sont obligatoires."
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."

ROOT_ENV="$SCRIPT_DIR/../../.env"
if [ -f "$ROOT_ENV" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ROOT_ENV"
  set +a
fi

npx ts-node -r tsconfig-paths/register scripts/seed-admin.ts \
  --identifiant="$IDENTIFIANT" \
  --password="$PASSWORD"
