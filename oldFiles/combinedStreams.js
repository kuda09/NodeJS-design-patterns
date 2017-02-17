const zlib = require('zlib');
const crypto = require('crypto');
const combine = require('multipipe');

module.exports.compressAndEncrpt = password => {

    return combine(zlib.createGzip(), crypto.createCipher('aes192', password));
}

module.exports.decryptAndDecompress = password => {

    return combine(crypto.createDecipher('aes192', password), zlib.createGunzip())
}