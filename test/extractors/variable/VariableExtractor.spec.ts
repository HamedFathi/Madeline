import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, VariableStatement, VariableDeclarationKind } from 'ts-morph';
import { VariableInfo } from '../../../extractors/variable/VariableInfo';
import { VariableExtractor } from '../../../extractors/variable/VariableExtractor';

const varSample = `
export const test = 1;
class Sample {
  public Get() {
    let a = 1;
  }
}
const obj = {
    propertyAssignment: 5,
    shorthandPropertyAssignment,
    ...spreadAssignment,
    get getAccessor() {
        return 5;
    },
    set setAccessor(value: number) {
        // do something
    },
    method() {
        return "some string"
    }
};
export const BasicConfiguration = {
  /**
   * Apply this configuration to the provided container.
   */
  register(container: IContainer): IContainer {
    return RuntimeBasicConfiguration
      .register(container)
      .register(
        ...DefaultComponents,
        ...DefaultBindingSyntax,
        ...DefaultBindingLanguage
      );
  },
  /**
   * Create a new container with this configuration applied to it.
   */
  createContainer(): IContainer {
    return this.register(DI.createContainer());
  }
};
`;

describe('Variable Extractor', function () {
    it('should return correct VariableInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", varSample);
        let actualResult: VariableInfo[] = [];
        let expectedResult: VariableInfo[] = [];
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

