#!/bin/bash
# Full-page screenshot with headless Chrome (parallel-safe: every call gets its own profile).
#   scripts/media/shot.sh http://localhost:3000/about /tmp/about.png [width=1440] [height=9000]
# Height is the capture height: use a tall value for long pages (lazy images load because
# everything is inside the viewport). Mobile check: width 390.
URL="$1"; OUT="$2"; W="${3:-1440}"; H="${4:-9000}"
CHROME="${CHROME_BIN:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PROFILE=$(mktemp -d)
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --no-first-run \
  --user-data-dir="$PROFILE" --window-size="$W,$H" --virtual-time-budget=9000 --screenshot="$OUT" "$URL" >/dev/null 2>&1
rm -rf "$PROFILE"
[ -f "$OUT" ] && echo "$OUT" || { echo "screenshot failed for $URL" >&2; exit 1; }
