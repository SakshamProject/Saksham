#!/usr/bin/env bash

source /etc/profile
# source .envrc
source ~/.nvm/nvm.sh
nvm use
RAND_SUFFIX=`date +"%s"`
TEMP_DIR="/tmp/sakshambackend${RAND_SUFFIX}"
npm install --cache $TEMP_DIR
npm run build