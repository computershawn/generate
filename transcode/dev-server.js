#!/usr/bin/env node

const express = require('express');
const http = require('http');
const transcodeFunction = require('./index');

const main = () => {
  const app = express();
  const router = express.Router();
  
  router.post('/transcode', transcodeFunction.transcode);
  app.use('/', router);
  
  // start the server
  const port = 3030;
  app.set('port', port);
  const server = http.createServer(app);
  console.log(`dev server is listening on port ${port}`);
  server.listen(port);
}

main();
