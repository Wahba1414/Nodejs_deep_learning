const fs = require('fs');


// Encryption - cipher.
const crypto = require('crypto');

// Create a cypher instance.
const algorithm = 'aes-192-cbc';
// initialization vector for randomness.
const IV = Buffer.alloc(16, 0);

// Create a key.
const password = 'password';
const salt = 'salt';
const keyLen = 24; //depends on the algorithm.

const key = crypto.scryptSync(password, salt, keyLen);

// an algorithm or precedure for encryption/decryption.
var cipher = crypto.createCipheriv(algorithm, key, IV);



// open the file needed to encrypt and then zip.
var readStream = fs.createReadStream('./file1.txt');

// zip some file.
const zlib = require('zlib');
var zip = zlib.createGzip();


// New encrypted-zipped file.
var writeStream = fs.createWriteStream('./encrypted_zipped_file.zip');

readStream.pipe(zip).pipe(cipher).pipe(writeStream);


