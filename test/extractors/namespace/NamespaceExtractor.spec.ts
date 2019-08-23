import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, EnumDeclaration, ClassDeclaration } from 'ts-morph';
import { NamespaceExtractor } from '../../../extractors/namespace/NamespaceExtractor';

const namespaceSample = `
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
    it('should return correct NamespaceInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", namespaceSample);
        let actualResult: any[] = [];
        let expectedResult: any[] = [[{
            "name": "NS4",
            "isModule": false,
            "modifiers": undefined,
            "level": 1
        }, {
            "name": "NS3",
            "isModule": true,
            "modifiers": undefined,
            "level": 2
        }, {
            "name": "NS2",
            "isModule": false,
            "modifiers": ["export"],
            "level": 3
        }, {
            "name": "NS1",
            "isModule": true,
            "modifiers": undefined,
            "level": 4
        }
        ]];
        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let nsEx = new NamespaceExtractor();
                    let ns = nsEx.extract(<ClassDeclaration>x);
                    actualResult.push(ns);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

