const zlib = require('zlib');
const fs = require('fs');

var unzip = zlib.createGunzip();

var readStream = fs.createReadStream('./file1.zip');
var writeStream = fs.createWriteStream('./file2.txt');

readStream.pipe(unzip).pipe(writeStream);

module.exports = unzip;