import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, EnumDeclaration } from 'ts-morph';
import { CoverageCalculatorInfo } from '../../../extractors/doc-coverage/CoverageCalculatorInfo';
import { CoverageExtractor } from '../../../extractors/doc-coverage/CoverageExtractor';
import { CoverageCalculator } from '../../../extractors/doc-coverage/CoverageCalculator';

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


describe('Coverage Calculator', function () {
    it('should return correct CoverageCalculatorInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", jsDocSample);
        let actualResult: CoverageCalculatorInfo;
        let expectedResult: CoverageCalculatorInfo = {
            "items": 5,
            "documented": {
                "count": 4,
                "jsDoc": 1,
                "leading": 4,
                "trailing": 0,
                "percent": 80
            },
            "undocumented": {
                "count": 1,
                "jsDoc": 4,
                "leading": 1,
                "trailing": 5,
                "percent": 20
            }
        };

        let coverageExtractor = new CoverageExtractor();
        let coverageInfo = coverageExtractor.extract(file);
        let coverageCalc = new CoverageCalculator(coverageInfo);
        let calcResult = coverageCalc.calculate();
        actualResult = calcResult;
        assert.deepEqual(actualResult, expectedResult);
    });
});

