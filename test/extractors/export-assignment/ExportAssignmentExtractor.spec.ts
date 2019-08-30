import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ExportAssignment } from 'ts-morph';
import { ExportAssignmentInfo } from '../../../extractors/export-assignment/ExportAssignmentInfo';
import { ExportAssignmentExtractor } from '../../../extractors/export-assignment/ExportAssignmentExtractor';

const exportSample = `
export module A {
  module B {
    export default new Router({
      routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
          path: '/vueexamples/vueIntroduction',
          name: 'VueIntroduction',
          component: VueIntroduction
        }
    
      ]
    })
  }
}
`;

describe('Export Assignment Extractor', function () {
  it('should return correct ExportAssignmentInfo', function () {
    const project = new Project({
      compilerOptions: {
        target: ScriptTarget.ES5
      }
    });
    const file = project.createSourceFile("test.ts", exportSample);
    let expectedResult: ExportAssignmentInfo[] = [{
      "text": "export default new Router({\n      routes: [\n        {\n          path: '/',\n          name: 'HelloWorld',\n          component: HelloWorld\n        },\n        {\n          path: '/vueexamples/vueIntroduction',\n          name: 'VueIntroduction',\n          component: VueIntroduction\n        }\n    \n      ]\n    })",
      "trailingComments": undefined,
      "leadingComments": undefined,
      "modules": [{
        "name": "B",
        "isNamespace": false,
        "modifiers": undefined,
        "level": 1
      }, {
        "name": "A",
        "isNamespace": false,
        "modifiers": ["export"],
        "level": 2
      }]
    }];
    let exportVisitor = new ExportAssignmentExtractor();
    let actualResult = exportVisitor.extract(file);
    assert.deepEqual(actualResult, expectedResult);
  });
});

