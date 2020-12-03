#!/bin/bash

npm install

npm run build

rm -rf /home/www/*

mv /root/my-vue-demo/dist/* /home/www

rm -rf /root/my-vue-demo