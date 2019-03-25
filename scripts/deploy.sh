#!/usr/bin/env bash

DATE=`date +%Y-%m-%d`
npm run build
git add .
git commit -m "chore(dist) new update - $DATE"
git push
