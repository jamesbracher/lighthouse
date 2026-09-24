#!/usr/bin/env bash
# Store the Cloudflare credentials as GitHub Actions secrets for this repo.
# Nothing you type is echoed, logged, or written to disk.
set -euo pipefail

cd "$(dirname "$0")/.."

read -rsp "Cloudflare API token: " CLOUDFLARE_API_TOKEN
echo
read -rp  "Cloudflare account ID: " CLOUDFLARE_ACCOUNT_ID

# Strip any stray whitespace or newlines from a paste
CLOUDFLARE_API_TOKEN="$(printf '%s' "$CLOUDFLARE_API_TOKEN" | tr -d '[:space:]')"
CLOUDFLARE_ACCOUNT_ID="$(printf '%s' "$CLOUDFLARE_ACCOUNT_ID" | tr -d '[:space:]')"

# Check the token with Cloudflare before storing it
echo "Checking token with Cloudflare..."
if ! curl -sSf -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
      https://api.cloudflare.com/client/v4/user/tokens/verify \
      | grep -q '"status":"active"'; then
  echo "Cloudflare rejected that token. Use an API token (My Profile > API Tokens > Create Token," >&2
  echo "'Edit Cloudflare Workers' template), not the Global API Key. Nothing was stored." >&2
  exit 1
fi
echo "Token is valid."

printf '%s' "$CLOUDFLARE_API_TOKEN"  | gh secret set CLOUDFLARE_API_TOKEN
printf '%s' "$CLOUDFLARE_ACCOUNT_ID" | gh secret set CLOUDFLARE_ACCOUNT_ID

unset CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID
echo "Done. Secrets set:"
gh secret list
