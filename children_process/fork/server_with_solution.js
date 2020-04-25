'use strict';

const { fork } = require('child_process');
const http = require('http');

const longProcessPath = './long_process.js';

var handler = function (req, res) {
  res.write('Hello, i am here ...');
  res.end();

  var child_process = fork(longProcessPath);

  // This child process could send/receive message to/from the parent process.
  child_process.on('message', (msg) => {
    console.log(`msg: ${msg}`);
  });

  console.log('End of request');
}

var server = http.createServer(handler);
server.listen(9000);
