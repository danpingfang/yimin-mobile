#!/usr/bin/env bash
rm -rf dist/
rm src/config.js
if [ $1 = "publish" ]; then
      cp src/config.prod.js src/config.js
    else
      cp src/config.local.js src/config.js
fi
npm run build
mkdir dist/static/fonts
mkdir dist/static/css
mkdir dist/static/images
cp static/js/build.vendor.js dist/static/js/
cp static/js/lazysizes.js dist/static/js/
cp static/js/wechatShare.js dist/static/js/
cp -r static/css/*.css dist/static/css/
cp -r static/css/**/*.css dist/static/css/
cp -r static/css/**/**/*.css dist/static/css/
cp -r static/fonts/ dist/static/
cp -r static/images/ dist/static/

if [ $1 = "publish" ]; then
      scp -r node_modules/video.js root@115.159.33.205:/var/www/oversealive/s/static/1.0.0/node_modules/
      scp -r dist/static/js root@115.159.33.205:/var/www/oversealive/s/static/1.0.0/yimin
      scp -r dist/static/css root@115.159.33.205:/var/www/oversealive/s/static/1.0.0/yimin
      scp -r dist/static/images root@115.159.33.205:/var/www/oversealive/s/static
    else
      scp -r node_modules/video.js root@115.159.33.205:/var/www/oversealive/s-test/static/debug/node_modules
      scp -r dist/static/css root@115.159.33.205:/var/www/oversealive/s-test/static/debug/yimin
      scp -r dist/static/js root@115.159.33.205:/var/www/oversealive/s-test/static/debug/yimin
      scp -r dist/static/images root@115.159.33.205:/var/www/oversealive/s-test/static
fi
