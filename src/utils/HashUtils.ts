/* eslint-disable */
const crypto = require('crypto');
/* eslint-disable */

const getSha512 = function (text: string): string {
    let hash = crypto.createHash('sha512');
    let data = hash.update(text, 'utf-8');
    let result = data.digest('hex');
    return result as string;
}
const getSha256 = function (text: string): string {
    let hash = crypto.createHash('sha256');
    let data = hash.update(text, 'utf-8');
    let result = data.digest('hex');
    return result as string;
}

export{ getSha256, getSha512 };