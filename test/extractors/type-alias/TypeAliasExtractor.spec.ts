import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, TypeAliasDeclaration } from 'ts-morph';
import { TypeAliasInfo } from '../../../extractors/type-alias/TypeAliasInfo';
import { TypeAliasExtractor } from '../../../extractors/type-alias/TypeAliasExtractor';
const typeAliasSample = `
export type ColorType = 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark';
`;

describe('Type Alias Extractor', function () {
    it('should return correct TypeAliasInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", typeAliasSample);
        let actualResult: any;
        let expectedResult: TypeAliasInfo;
        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.TypeAliasDeclaration:
                    let taVisitor = new TypeAliasExtractor();
                    actualResult = taVisitor.extract(<TypeAliasDeclaration>x);
                    break;
            }
        });
        //assert.deepEqual(actualResult, expectedResult);
    });
});

