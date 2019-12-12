const zlib = require('zlib');
const fs = require('fs');

var zip = zlib.createGzip();

var readStream = fs.createReadStream('./file1.txt');
var writeStream = fs.createWriteStream('./file1.zip');


readStream.pipe(zip).pipe(writeStream);

module.exports = zip;