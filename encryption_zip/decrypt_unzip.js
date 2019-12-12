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
var decipher = crypto.createDecipheriv(algorithm, key, IV);



// open the file needed to encrypt and then zip.
var readStream = fs.createReadStream('./encrypted_zipped_file.zip');

// unzip some file.
const zlib = require('zlib');
var unzip = zlib.createGunzip();

// New encrypted-zipped file.
var writeStream = fs.createWriteStream('./recovered');

readStream.pipe(decipher).pipe(unzip).pipe(process.stdout);
// readStream.pipe(decipher).pipe(process.stdout)

