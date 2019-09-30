/* eslint-disable */
const crypto = require('crypto');
/* eslint-disable */

export class HashUtils
{
    public getSha512(text:string) : string
    {
        let hash = crypto.createHash('sha512');
        let data = hash.update(text, 'utf-8');
        let result = data.digest('hex');
        return result as string;
    }
    public getSha256(text:string) : string
    {
        let hash = crypto.createHash('sha256');
        let data = hash.update(text, 'utf-8');
        let result = data.digest('hex');
        return result as string;
    }
}