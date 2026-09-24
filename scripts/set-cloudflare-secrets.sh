#!/usr/bin/env bash
# Store the Cloudflare credentials as GitHub Actions secrets for this repo.
# Nothing you type is echoed, logged, or written to disk.
set -euo pipefail

cd "$(dirname "$0")/.."

read -rsp "Cloudflare API token: " CLOUDFLARE_API_TOKEN
echo
read -rp  "Cloudflare account ID: " CLOUDFLARE_ACCOUNT_ID

printf '%s' "$CLOUDFLARE_API_TOKEN"  | gh secret set CLOUDFLARE_API_TOKEN
printf '%s' "$CLOUDFLARE_ACCOUNT_ID" | gh secret set CLOUDFLARE_ACCOUNT_ID

unset CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID
echo "Done. Secrets set:"
gh secret list
