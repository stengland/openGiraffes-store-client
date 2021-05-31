#!/bin/bash
set -e #fail on error

mkdir -p ./build/tmp

rm ./build/tmp/application.zip || true
rm ./build/openkaios-store-nightly.zip || true

echo "{\"version\": 1,\"manifestURL\":\"app://store.openkaios.org/manifest.webapp\"}" > ./build/tmp/metadata.json


cd build/app
zip -qr ../tmp/application.zip .

cd ../tmp
zip -qr ../openkaios-store-nightly.zip .

echo "Created openkaios-store-nightly.zip"