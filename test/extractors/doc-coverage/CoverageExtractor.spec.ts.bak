import { assert } from "chai";
import { Project, ScriptTarget } from 'ts-morph';
import { CoverageExtractorInfo } from '../../../extractors/doc-coverage/CoverageExtractorInfo';
import { CoverageExtractor } from '../../../extractors/doc-coverage/CoverageExtractor';

const jsDocSample = `
// This a class
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    /**
     * A method.
     * @method greet {void} - Say Hello
     */
    greet() {
        return "Hello, " + this.greeting;
    }
}
// Some media types as an enum.
export enum MediaType {
    Book = 10,
    Video,
    Blog,
    Article,
    Podcast
}
// This is just a function.
export function addNumbers() {}
`;


describe('Coverage Extractor', function () {
    it('should return correct CoverageExtractorInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", jsDocSample);
        let actualResult: CoverageExtractorInfo[] = [];
        let expectedResult: CoverageExtractorInfo[] = [{
            "name": "Greeter",
            "kind": 241,
            "kindName": "ClassDeclaration",
            "hasLeadingComment": true,
            "hasTrailingComment": false,
            "hasJsDoc": false
        }, {
            "name": "greeting",
            "kind": 155,
            "kindName": "PropertyDeclaration",
            "hasLeadingComment": false,
            "hasTrailingComment": false,
            "hasJsDoc": false
        }, {
            "name": "greet",
            "kind": 157,
            "kindName": "MethodDeclaration",
            "hasLeadingComment": true,
            "hasTrailingComment": false,
            "hasJsDoc": true
        }, {
            "name": "MediaType",
            "kind": 244,
            "kindName": "EnumDeclaration",
            "hasLeadingComment": true,
            "hasTrailingComment": false,
            "hasJsDoc": false
        }, {
            "name": "addNumbers",
            "kind": 240,
            "kindName": "FunctionDeclaration",
            "hasLeadingComment": true,
            "hasTrailingComment": false,
            "hasJsDoc": false
        }];

        let coverageExtractor = new CoverageExtractor();
        let coverageInfo = coverageExtractor.extract(file);
        actualResult = coverageInfo;
        assert.deepEqual(actualResult, expectedResult);
    });
});

