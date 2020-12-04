#!/bin/bash

npm install

npm run build

rm -rf /home/edu-boss/*

mkdir /home/edu-boss

mv /root/my-vue-demo/dist/* /home/edu-boss

rm -rf /root/my-vue-demo

pm2 start /home/edu-boss 8080