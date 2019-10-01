import {assert} from 'chai';
import { getPathInfo } from '../../utilities/PathUtils';

describe( 'path utils' , () =>{

    it('should return directory and file name' , () =>{

        var sut = '/dev/playground/sample.ts';

        var result = getPathInfo(sut);

        assert.equal(result.file , "sample.ts");
        assert.equal(result.directory , "/dev/playground");
        assert.equal(result.path, sut);
    });
});
