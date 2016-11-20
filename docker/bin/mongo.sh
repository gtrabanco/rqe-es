#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
echo "Usage: $0 <volume_data> <container_name> <port>"
echo "First create a volume with:"
echo "\tdocker volume create <volume_data>"
exit 0
fi

export APP_PORT=27017
export DOCKER_IMAGE=mongo
export IMAGE_TAG=3
export CONTAINER_RAM=1G
export DOCKER_BIN=/usr/bin/docker

export DOCKER_VOLUME=$1
export CONTAINER_NAME=$2
export CONTAINER_PORT=$3

$DOCKER_BIN stop -t 0 $CONTAINER_NAME &> /dev/null
$DOCKER_BIN rm -f -v $CONTAINER_NAME &> /dev/null

$DOCKER_BIN pull $DOCKER_IMAGE:$IMAGE_TAG

$DOCKER_BIN run -d --restart on-failure:5 -m $CONTAINER_RAM --memory-swap 0 -p $CONTAINER_PORT:$APP_PORT \
    --name $CONTAINER_NAME \
    --security-opt=no-new-privileges \
    -v $DOCKER_VOLUME:/data/db:Z \
    $DOCKER_IMAGE:$IMAGE_TAG