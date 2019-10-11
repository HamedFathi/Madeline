import { assert } from 'chai';

import { getSha256, getSha512 } from '../../src/utils/HashUtils';


describe('hash utils', () => {
    it('should return sh256 of the specified string', () => {
        const sut = 'hello world';
        const sha256 = getSha256(sut);

        assert.equal(sha256, 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
    });

    it('should return sh512 of the specified string', () => {
        const sut = 'hello world';
        const sha512 = getSha512(sut);

        assert.equal(
            sha512,
            '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f',
        );
    });
});
