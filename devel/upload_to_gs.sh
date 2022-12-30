#!/bin/bash

set -ex

TARGET=gs://figurl/doc-figurl

yarn build
gsutil -m cp -R ./build/* $TARGET/