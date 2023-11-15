#!/bin/bash

WORKDIR="$( cd "$( dirname "$0" )" && pwd )"
echo "Working Directory"
echo $WORKDIR
echo ""

#login to dockerhub
echo "Login to dockerhub.."
echo ""

echo "Building docker image.."
docker build --no-cache -t cupajaypeeig/test-service:latest .

echo "Pushing docker image.."
docker push cupajaypeeig/test-service:latest

#create task definition
#update service
