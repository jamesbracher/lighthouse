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

# Check the token with Cloudflare before storing it.
# User tokens verify at /user/tokens/verify; account-owned tokens only at
# /accounts/<id>/tokens/verify, so try both.
echo "Checking token with Cloudflare..."
verify() {
  curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" "$1"
}
RESULT="$(verify https://api.cloudflare.com/client/v4/user/tokens/verify)"
if ! grep -q '"status":"active"' <<<"$RESULT"; then
  RESULT="$(verify "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/tokens/verify")"
fi
if ! grep -q '"status":"active"' <<<"$RESULT"; then
  echo "Cloudflare rejected that token. Its reply was:" >&2
  echo "  $RESULT" >&2
  echo "Copy the long token value again (not its name) and paste it once. Nothing was stored." >&2
  exit 1
fi
echo "Token is valid."

printf '%s' "$CLOUDFLARE_API_TOKEN"  | gh secret set CLOUDFLARE_API_TOKEN
printf '%s' "$CLOUDFLARE_ACCOUNT_ID" | gh secret set CLOUDFLARE_ACCOUNT_ID

unset CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID
echo "Done. Secrets set:"
gh secret list
