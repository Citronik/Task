#!/bin/bash

node ace migration:run --force
node ace serve --watch
