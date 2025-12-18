#!/bin/bash

# 1. Upload
echo "Uploading..."
UPLOAD_RESPONSE=$(curl -s -X POST -F "file=@public/test-image.jpg" http://localhost:3001/api/upload)
echo "Upload Response: $UPLOAD_RESPONSE"

# Extract URL (using grep/sed purely for simplicity if jq not available, assuming simple JSON)
# Assuming response {"success":true,"url":"/temp/..."}
# URL=$(echo $UPLOAD_RESPONSE | grep -o '"url":"[^"]*' | cut -d'"' -f4)
# Better just copy paste for manual test or rely on visual inspection.
# But for automation let's try to extract.
URL=$(echo $UPLOAD_RESPONSE | sed -n 's/.*"url":"\([^"]*\)".*/\1/p')

echo "Uploaded URL: $URL"

if [ -z "$URL" ]; then
  echo "Upload failed to extract URL"
  exit 1
fi

# 2. Process
echo "Processing..."
curl -X POST -H "Content-Type: application/json" \
  -d "{\"imageUrl\":\"$URL\", \"steps\":[{\"id\":\"1\",\"provider\":\"mock\",\"action\":\"enhance\"}]}" \
  http://localhost:3001/api/process
echo ""
