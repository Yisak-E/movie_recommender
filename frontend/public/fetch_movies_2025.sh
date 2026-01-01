#!/usr/bin/env bash

API_KEY="$OMDB_API_KEY"
INPUT="movies_2025.txt"
OUTPUT="movies_2025.json"

if [[ -z "$API_KEY" ]]; then
  echo "❌ OMDB_API_KEY not set"
  exit 1
fi

if [[ ! -f "$INPUT" ]]; then
  echo "❌ movies_2025.txt not found"
  exit 1
fi

echo "[]" > "$OUTPUT"

echo "🎬 Fetching movies from list..."

while IFS= read -r TITLE; do
  [[ -z "$TITLE" ]] && continue

  echo "➡️  $TITLE"

  RESPONSE=$(curl -s \
    "http://www.omdbapi.com/?apikey=$API_KEY&t=$(printf '%s' "$TITLE" | jq -sRr @uri)&plot=full")

  OK=$(echo "$RESPONSE" | jq -r '.Response')

  if [[ "$OK" != "True" ]]; then
    echo "⚠️  Not found: $TITLE"
    continue
  fi

  jq --argjson movie "$RESPONSE" '. += [$movie]' "$OUTPUT" > tmp.json
  mv tmp.json "$OUTPUT"

  sleep 0.3   # prevent rate limiting

done < "$INPUT"

echo "✅ Done"
echo "📁 Output: $OUTPUT"
echo "🎞 Movies saved: $(jq length "$OUTPUT")"
