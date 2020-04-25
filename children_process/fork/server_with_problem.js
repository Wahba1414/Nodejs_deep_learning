'use strict';

// const {fork} = require('child_process');
const http = require('http');

var handler = function (req, res) {
  res.write('Hello, i am here ...');
  res.end();
  // Problem: Long-time process which utilize CPU for long time, will make
  // the app not responsive, because Node.js is signle threaded.
  // For sure, this problem happens whether the long process is sync or callback (async. event handler)
  // because at the end, both of them will be run asynchronously.
  // This is the biggest cons of Node.js
  setTimeout(() => {
    //Mimic CPU-intensive process.
    while (1) { }
  }, 100)
  console.log('End of request');
}

var server = http.createServer(handler);
server.listen(9000);
