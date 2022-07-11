#!/usr/bin/env node

const fs = require('fs');
const request = require('request');
const argv = require('yargs').argv;
const urlDev = 'http://localhost:3030/transcode';
const urlRemote = 'https://us-central1-frame-generate-4096.cloudfunctions.net/transcode';

const url = argv.dev ? urlDev : urlRemote;

request.post(url, {
  formData: {
    video: fs.createReadStream(`${__dirname}/mountain-sky-1.mp4`)
  }
}, (err, res, body) => {
  if (err) {
    return console.error(err, res, body);
  }
  if (typeof body === 'string') body = JSON.parse(body);
  fs.writeFileSync('./tmp/buffer.mp4', Buffer.from(body.buffer.data));
});
