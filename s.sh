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
cp -r static/css/*.css dist/static/css/
cp -r static/css/**/*.css dist/static/css/
cp -r static/css/**/**/*.css dist/static/css/
cp -r static/fonts/ dist/static/
cp -r static/images/ dist/static/
if [ $1 = "publish" ]; then
      rsync -av node_modules/video.js root@115.159.33.205:/var/www/app/static/node_modules/
      rsync -av dist/static/ root@115.159.33.205:/var/www/app/static/yimin/
    else
      rsync -av node_modules/video.js root@115.159.33.205:/var/www/app/test/static/node_modules/
      rsync -av dist/static/ root@115.159.33.205:/var/www/app/test/static/yimin/
fi
