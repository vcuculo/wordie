#!/usr/bin/env bash

rm -rf ./bin
mkdir ./bin

cp -rf ./media ./bin/media
cp -rf ./assets ./bin/assets
cp -rf ./_locales ./bin/_locales

cp -rf ./scripts ./bin/scripts
cp ./node_modules/jquery/dist/jquery.min.js ./bin/scripts/jquery.min.js

cp ./popup.html ./bin/popup.html
cp ./manifest.json ./bin/manifest.json
