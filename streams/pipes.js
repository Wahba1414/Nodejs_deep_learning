const fs = require('fs');

var readableStream = fs.createReadStream('./file1.txt');

readableStream.pipe(process.stdout);