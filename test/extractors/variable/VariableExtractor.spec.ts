import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration, VariableStatement, VariableDeclarationKind } from 'ts-morph';
import { VariableInfo } from '../../../extractors/variable/VariableInfo';
import { VariableExtractor } from '../../../extractors/variable/VariableExtractor';

const varSample = `
export const test = 1;
class Sample {
  public Get() {
    let a = 1;
  }
}
`;

describe('Variable Extractor', function () {
    it('should return correct VariableInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", varSample);
        let actualResult: VariableInfo[][] = [];
        let expectedResult: VariableInfo[][] = [[{
            "name": "test",
            "type": {
                "kind": 13,
                "kindName": "Number",
                "type": "1"
            },
            "modifiers": ["export"],
            "value": "1",
            "kind": VariableDeclarationKind.Const,
            "kindName": "const",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "hasAsExpression": false
        }],
        [{
            "name": "a",
            "type": {
                "kind": 13,
                "kindName": "Number",
                "type": "number"
            },
            "modifiers": undefined,
            "value": "1",
            "kind": VariableDeclarationKind.Let,
            "kindName": "let",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "hasAsExpression": false
        }]];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.VariableStatement:
                    let varVisitor = new VariableExtractor();
                    let vars = varVisitor.extract(<VariableStatement>x);
                    actualResult.push(vars);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

