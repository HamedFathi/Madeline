import  * as stringUtils  from "../../utilities/StringUtils";

import { assert } from "chai";


describe("String Utilities", () => {

    it('should return true when empty', () => {
        const str: string = '';

        let result = stringUtils.isEmptyOrWhitespace(str);

        assert.isTrue(result);

    });

    it('should return true when whitespace', () => {

        const str: string = '   ';

        let result = stringUtils.isEmptyOrWhitespace(str);

        assert.isTrue(result);

    });

    it('should convert multiple whitespace to one space', () => {
        const str = '               ';

        let result = stringUtils.convertToOneWhitespace(str);

        assert.equal(' ', result);

    });

    it('should remove single quotes from beginning and end', () => {
        const str = "'Sample string'";

        let result = stringUtils.removeFirstAndLastQuote(str);

        assert.equal('Sample string', result);
    });

    it('should remove double quotes from beginning and end', () => {
        const str = '"Sample string"';

        let result = stringUtils.removeFirstAndLastQuote(str);

        assert.equal('Sample string', result);
    });

    it('should remove backslash R', () => {
        const str = 'Sample \rstring';

        let result = stringUtils.removeLineBreaks(str);

        assert.equal(result, 'Sample string');
    });

    it('should remove backslash N', () => {
        const str = 'Sample \r\nstring';

        let result = stringUtils.removeLineBreaks(str);

        assert.equal(result, 'Sample string');
    });

    it('should join lines with no separator provided', () => {
        const text = `Hello
        this is a multi
        line
        text`;

        let result = stringUtils.joinLines(text);

        assert.equal(result, 'Hello this is a multi line text');
    });

    it('should join an array of strings together with space as separator', () => {

        const text: string[] = ['this ', 'is ', 'supposed ', 'to', 'be ', 'multiple ', 'lines '];

        const result = stringUtils.joinLines(text, ' ');

        assert.equal(result, 'this is supposed to be multiple lines');

    });

    it('should return 3 none breaking spaces &nbsp', () => {
        const result = stringUtils.nbsp(3);

        assert.equal(result, '&nbsp;&nbsp;&nbsp;');
    });

    it('should return WORLD from the middle of the text' , () =>{
        const text = 'Hello WORLD from other side';

        const result = stringUtils.getBetweenChars(text,' ', ' ' );

        assert.equal(result , 'WORLD');
    });

    it( 'should return null for undefined objects in a string representation of a json object', () =>{
        const obj = {
            // @ts-ignore
            id: 1 , allowed: true , name: 'Jane' , family: undefined
        };

        const result = stringUtils.stringify(obj);

        assert.equal(result, '{"id":1,"allowed":true,"name":"Jane","family":null}');

    });

})