import { StringUtils } from "../../utilities/StringUtils";
import { assert } from "chai";


describe("String Utilities", () => {

    let stringUtils: StringUtils;

    beforeEach(() => {
        stringUtils = new StringUtils();
    });

    it('should return true when empty', () => {

        const str: string = '';

        let result = stringUtils.isEmptyOrWhitespace(str);

        assert.isTrue( result );

    });

    it('should return true when whitespace', () => {

        const str: string = '';

        let result = stringUtils.isEmptyOrWhitespace(str);

        assert.isTrue( result );

    });

})