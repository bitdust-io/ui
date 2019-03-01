#!/usr/bin/env bash

DATE=`date +%Y-%m-%d`
npm run build
git add .
DATE=`date +%Y-%m-%d`
git commit -m "chore(dist) new update - $DATE"
git push
