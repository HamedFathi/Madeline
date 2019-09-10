import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration } from 'ts-morph';
import { ClassExtractor } from '../../../extractors/class/ClassExtractor';
import { ClassInfo } from '../../../extractors/class/ClassInfo';
import { StringUtils } from '../../../utilities/StringUtils';

const classSample = `
// This a test class.
export default class A {}
export interface IC {}
export interface ID {}
/**
* This is a test.
* Class number 2
*
* @class B
* @extends A
* @implements IC,ID
*/
export class B extends A implements IC, ID {}
export namespace NS1 {
	module NS2 {
		namespace NS3 {
			@test({a:1})
			class Greeter {
				greeting: string;
				constructor(message: string) {
					this.greeting = message;
				}
			}
		}
	}
}
`;

describe('Class Extractor', function () {
    it('should return correct ClassInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", classSample);
        let actualResult: ClassInfo[] = [];
        let expectedResult: ClassInfo[] = [];
        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let clsVisitor = new ClassExtractor();
                    let cls = clsVisitor.extract(<ClassDeclaration>x);
                    actualResult.push(cls);
                    break;
            }
        });
        // console.log(new StringUtils().stringify(actualResult));
        assert.deepEqual(actualResult, expectedResult);
    });
});

