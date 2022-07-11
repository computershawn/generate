#!/usr/bin/env node

const express = require('express');
const app = express();
const router = express.Router();
const transcodeFunction = require('./index');

router.post('/transcode', transcodeFunction.transcode);
app.use('/', router);

// start the server
const port = 3030;
const http = require('http');
app.set('port', port);
const server = http.createServer(app);
console.log(`dev server is listening on port ${port}`);
server.listen(port);
