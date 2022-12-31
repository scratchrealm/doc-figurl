#!/bin/bash

set -ex

TARGET=gs://figurl/doc-figurl

yarn run build-for-figurl-to-html
gsutil -m cp -R ./build/* $TARGET/
