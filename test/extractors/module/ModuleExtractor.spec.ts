import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, EnumDeclaration, ClassDeclaration } from 'ts-morph';
import { ModuleExtractor } from '../../../extractors/module/ModuleExtractor';

const moduleSample = `
module NS1 {
	export namespace NS2 {
		module NS3 {
			namespace NS4 {
				class Greeter {
					greeting: string;
					constructor(message: string) {
						this.greeting = message;
					}
				}
			}
		}
	}
}
`;


describe('Namespace Extractor', function () {
    it('should return correct ModuleInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", moduleSample);
        let actualResult: any[] = [];
        let expectedResult: any[] = [[{
            "name": "NS4",
            "isNamespace": true,
            "modifiers": undefined,
            "level": 1
        }, {
            "name": "NS3",
            "isNamespace": false,
            "modifiers": undefined,
            "level": 2
        }, {
            "name": "NS2",
            "isNamespace": true,
            "modifiers": ["export"],
            "level": 3
        }, {
            "name": "NS1",
            "isNamespace": false,
            "modifiers": undefined,
            "level": 4
        }
        ]];
        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let nsEx = new ModuleExtractor();
                    let ns = nsEx.extract(<ClassDeclaration>x);
                    actualResult.push(ns);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

