#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
echo "Usage: $0 <container_name> <port> <container_to_link> <link_name>"
echo "<link_name> Should be with default configuration \"mymongo\""
exit 0
fi


export APP_PORT=2180
export DOCKER_IMAGE=gtrabanco/rqe-es
export IMAGE_TAG=latest
export CONTAINER_RAM=512M
export DOCKER_BIN=/usr/bin/docker


export CONTAINER_NAME="$1_$2"
export CONTAINER_PORT=$2
export CONTAINER_LINK=$3
export LINK_NAME=$4


$DOCKER_BIN stop -t 0 $CONTAINER_NAME &> /dev/null
$DOCKER_BIN rm -f -v $CONTAINER_NAME &> /dev/null

$DOCKER_BIN pull $DOCKER_IMAGE:$IMAGE_TAG

$DOCKER_BIN run -d --restart on-failure:5 -m $CONTAINER_RAM --memory-swap 0 -p $CONTAINER_PORT:$APP_PORT \
    --name $CONTAINER_NAME \
    --security-opt=no-new-privileges \
    --link $CONTAINER_LINK:$LINK_NAME\
    $DOCKER_IMAGE:$IMAGE_TAG