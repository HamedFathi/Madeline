import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration, VariableDeclarationKind } from 'ts-morph';
import { SetAccessorInfo } from '../../../extractors/set-accessor/SetAccessorInfo';
import { SetAccessorExtractor } from '../../../extractors/set-accessor/SetAccessorExtractor';

const setAccessorSample = `
class Student {
    private _name: string;
    public set name(value: string) {
        const a = 1;
        this._name = value;
    }
} 
`;


describe('SetAccessor Extractor', function () {
    it('should return correct SetAccessorInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", setAccessorSample);
        let actualResult: SetAccessorInfo[] | undefined = undefined;
        let expectedResult: SetAccessorInfo[] = [{
            "name": "name",
            "parameter": {
                "name": "value",
                "modifiers": undefined,
                "type": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                }
            },
            "expressions": [{
                "text": "this._name = value;",
                "trailingComments": undefined,
                "leadingComments": undefined,
                "modules": undefined
            }
            ],
            "modifiers": ["public"],
            "decorators": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "variables": [[{
                "name": "a",
                "type": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "1"
                },
                "modifiers": undefined,
                "value": "1",
                "kind": VariableDeclarationKind.Const,
                "kindName": "const",
                "trailingComments": undefined,
                "leadingComments": undefined,
                "modules": undefined,
                "hasAsExpression": false
            }]]
        }];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let setEx = new SetAccessorExtractor();
                    let setAccessors = setEx.extractFromClass(<ClassDeclaration>x);
                    actualResult = setAccessors;
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

