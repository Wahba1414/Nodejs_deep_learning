// transform stream outputs JS arrays.
const { Transform } = require('stream');

var Custom_Transform = new Transform({
  // writableObjectMode: true,
  readableObjectMode: true, //when push function takes non string nor buffer as an argument.

  write(chunk, encoding, cb) {
    this.push([chunk.toString()]);
    // this.push(chunk.toString());
    cb();
  }

});

// readable stream.
const fs = require('fs');
var readStream = fs.createReadStream('file1.txt');


// writable stream with Object mode.
const { Writable } = require('stream');

var Custom_Writable = new Writable({
  objectMode: true,

  write(chunk, encoding, cb) {
    // console.log(encoding);
    // some process.
    console.log('Writable: ', chunk);
    cb();
  }
});

readStream.on('data', function (chunk) {
  console.log(`chunk: ${chunk}`);
}).pipe(Custom_Transform).pipe(Custom_Writable);