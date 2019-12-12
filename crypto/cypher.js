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

// Encryption.
var encypted = cipher.update('zizo is the one', 'utf8', 'hex');
console.log(`encrypted: ${encypted}`);

encypted += cipher.final('hex'); //to get any remaining enciphyer data.
console.log(`encrypted: ${encypted}`);

// Decryption.
var decipher = crypto.createDecipheriv(algorithm, key, IV);

var decrypted = decipher.update(encypted,'hex' , 'utf8');
decrypted += decipher.final('utf8');

console.log(`decrypted: ${decrypted}`);

