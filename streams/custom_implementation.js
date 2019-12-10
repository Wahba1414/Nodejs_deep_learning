// readable stream.
const { Readable } = require('stream');

var Custom_Readable = new Readable({
  // it seems it is called once at the beginning.
  // and pushing a null, clear the internal buffer.
  read() {
    // read from somewhere by someway!!
    this.push('zizo'); //1st chunk.
    this.push('b');    //2nd chunk.
    this.push('c\n');  //3rd chunk.
    this.push(null); //means data end (without it, will continue for infinity)
  }
});

// Custom_Readable.pipe(process.stdout);



// writable stream.
const { Writable } = require('stream');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');


var Custom_Writable = new Writable({
  write(chunk, encoding, cb) {
    // console.log(encoding);
    // some process.
    console.log('Writable: ' + decoder.write(chunk));
    cb();
  }
});

// Custom_Readable.pipe(Custom_Writable);
// Custom_Readable.pipe(Custom_Writable);

// process.stdin.pipe(Custom_Writable);


// duplex stream.
const { Duplex } = require('stream');
var Custom_Duplex = new Duplex({
  read() {
    // read from somewhere by someway!!
    this.push('Mido'); //1st chunk.
    this.push('B');    //2nd chunk.
    this.push('C\n');  //3rd chunk.
    this.push(null); //means data end (without it, will continue for infinity)
  },
  write(chunk, encoding, cb) {
    // console.log(encoding);
    // some process.
    console.log('Duplex: ' + decoder.write(chunk));
    cb();
  }

});

// Custom_Readable.pipe(Custom_Duplex).pipe(Custom_Writable);

// transform stream.
const {Transform} = require('stream');
var Custom_Transform = new Transform({
  write(chunk, encoding, cb){
    // console.log('Transform: ' + decoder.write(chunk).toUpperCase());
    this.push(decoder.write(chunk).toUpperCase());
    cb();
  }
});

Custom_Readable.pipe(Custom_Transform).pipe(Custom_Writable);


