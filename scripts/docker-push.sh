#!/bin/bash

set -e

echo $GCLOUD_SERVICE_KEY_TEST | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud docker -- push "${REGISTRY_ADDRESS}/${REGISTRY_PROJECT_ID}/pintro-server"
gcloud docker -- push "${REGISTRY_ADDRESS}/${REGISTRY_PROJECT_ID}/mongo-seed"
