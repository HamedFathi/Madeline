import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration } from 'ts-morph';
import { GetAccessorInfo } from '../../../extractors/get-accessor/GetAccessorInfo';
import { GetAccessorExtractor } from '../../../extractors/get-accessor/GetAccessorExtractor';

const getAccessorSample = `
class foo {
    private _bar: boolean = false;
    get bar(): boolean {
        return this._bar;
    }
    get fullName() {
        return 'test';
    }
}    
`;


describe('GetAccessor Extractor', function () {
    it('should return correct GetAccessorInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", getAccessorSample);
        let actualResult: GetAccessorInfo[] | undefined = undefined;
        let expectedResult: GetAccessorInfo[] = [{
            "name": "bar",
            "returnType": {
                "kind": 4,
                "kindName": "Boolean",
                "type": "boolean"
            },
            "modifiers": undefined,
            "decorators": undefined,
            "variables": undefined,
            "expressions": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined
        }, {
            "name": "fullName",
            "returnType": {
                "kind": 15,
                "kindName": "String",
                "type": "string"
            },
            "modifiers": undefined,
            "decorators": undefined,
            "variables": undefined,
            "expressions": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined
        }];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let getEx = new GetAccessorExtractor();
                    let getAccessors = getEx.extractFromClass(<ClassDeclaration>x);
                    actualResult = getAccessors;
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

