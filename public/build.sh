#!/bin/sh

git clone https://github.com/titaniumnetwork-dev/ultraviolet ultraviolet
cd ultraviolet
npm install
npm run build

cd dist
for file in uv.bundle.js uv.client.js uv.handler.js uv.sw.js; do
    cp -f $file ../../uv/
done

cd ../..
rm -rf ultraviolet
