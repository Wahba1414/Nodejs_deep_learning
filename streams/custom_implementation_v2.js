const { Readable } = require('stream');

function createReadableStream(params) {
  var readStream = new Readable({
    objectMode: true,
    read() {
      // this.push({ time: new Date() });
    }

    // instead of continuous data to read we need 
    // to add some tweaks here.
  });

  setTimeout(() => {
    readStream.push(new Date());
  }, 200)

  return readStream;
}

const { Transform } = require('stream');

function createTransformStream(params) {
  return new Transform({
    objectMode: true,
    transform(data, _, cb) {
      cb(null, `New Format: ${data}`);
    }
  });
}

const { Writable } = require('stream');

function createWritableStream(params) {
  return new Writable({
    objectMode: true,
    write(data, _, cb) {
      console.log(data);
      cb();
    }
  });
}

createReadableStream().pipe(createTransformStream()).pipe(createWritableStream());