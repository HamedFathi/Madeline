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
        let expectedResult: ClassInfo[] = [{
            "name": "A",
            "text": "\n// This a test class.\nexport default class A {}",
            "modifiers": ["export", "default"],
            "extends": undefined,
            "implements": undefined,
            "trailingComments": undefined,
            "leadingComments": [{
                "text": "// This a test class.",
                "kind": 0,
                "kindName": "JsSingleLine",
                "description": ["This a test class."],
                "tags": undefined
            }],
            "decorators": undefined,
            "modules": undefined,
            "typeParameters": undefined
        },
        {
            "name": "B",
            "text": "\n/**\n* This is a test.\n* Class number 2\n*\n* @class B\n* @extends A\n* @implements IC,ID\n*/\nexport class B extends A implements IC, ID {}",
            "modifiers": ["export"],
            "extends": "A",
            "implements": ["IC", "ID"],
            "trailingComments": undefined,
            "leadingComments": [{
                "text": "/**\n* This is a test.\n* Class number 2\n*\n* @class B\n* @extends A\n* @implements IC,ID\n*/",
                "kind": 1,
                "kindName": "JsMultiLine",
                "description": ["This is a test.", "Class number 2"],
                "tags": [{
                    "tag": "@class",
                    "type": undefined,
                    "name": ["B"],
                    "defaultValue": undefined,
                    "description": undefined
                }, {
                    "tag": "@extends",
                    "type": undefined,
                    "name": ["A"],
                    "defaultValue": undefined,
                    "description": undefined
                }, {
                    "tag": "@implements",
                    "type": undefined,
                    "name": ["IC,ID"],
                    "defaultValue": undefined,
                    "description": undefined
                }]
            }],
            "decorators": undefined,
            "modules": undefined,
            "typeParameters": undefined
        },
        {
            "name": "Greeter",
            "text": "\n\t\t\t@test({a:1})\n\t\t\tclass Greeter {\n\t\t\t\tgreeting: string;\n\t\t\t\tconstructor(message: string) {\n\t\t\t\t\tthis.greeting = message;\n\t\t\t\t}\n\t\t\t}",
            "modifiers": undefined,
            "extends": undefined,
            "implements": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "decorators": [{
                "isDecoratorFactory": true,
                "name": "test",
                "parameters": [{
                    "kind": 10,
                    "kindName": "Json",
                    "type": [{
                        "name": "a",
                        "value": "1"
                    }]
                }]
            }],
            "typeParameters": undefined,
            "modules": [{
                "name": "NS3",
                "isNamespace": true,
                "modifiers": undefined,
                "level": 1
            }, {
                "name": "NS2",
                "isNamespace": false,
                "modifiers": undefined,
                "level": 2
            }, {
                "name": "NS1",
                "isNamespace": true,
                "modifiers": ["export"],
                "level": 3
            }]
        }];
        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let clsVisitor = new ClassExtractor();
                    let cls = clsVisitor.extract(<ClassDeclaration>x);
                    actualResult.push(cls);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

