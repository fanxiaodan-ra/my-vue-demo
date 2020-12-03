#!/bin/bash

npm install

npm run build

rm -rf /home/www/*

mv /tmp/my-vue-demo/dist/* /home/www

rm -rf /tmp/my-vue-demo