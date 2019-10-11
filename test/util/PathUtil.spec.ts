import { assert } from 'chai';
import { getPathInfo } from '../../src/utils/PathUtils';

describe('path utils', () => {
    it('should return directory and file name', () => {
        const sut = '/dev/playground/sample.ts';

        const result = getPathInfo(sut);
        assert.equal(result.extension, '.ts');
        assert.equal(result.file, 'sample');
        assert.equal(result.directory, '/dev/playground');
        assert.equal(result.path, sut);
    });
});
