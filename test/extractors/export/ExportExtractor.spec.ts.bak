import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration } from 'ts-morph';
import { ExportInfo } from '../../../extractors/export/ExportInfo';
import { ExportExtractor } from "../../../extractors/export/ExportExtractor";

const exportSample = `
export * from "./file";
export {MyClass} from "./other-file";
export {OtherClass};
export {A as aaa, B, C, D as ddd};
interface A {}
interface B {}
interface C {}
interface D {}
`;

describe('Export Extractor', function () {
    it('should return correct ExportInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", exportSample);
        let expectedResult: ExportInfo[] = [{
            "moduleSpecifier": "./file",
            "namedExports": undefined
        }, {
            "moduleSpecifier": "./other-file",
            "namedExports": [{
                "name": "MyClass",
                "as": "MyClass"
            }
            ]
        }, {
            "moduleSpecifier": undefined,
            "namedExports": [{
                "name": "OtherClass",
                "as": "OtherClass"
            }
            ]
        }, {
            "moduleSpecifier": undefined,
            "namedExports": [{
                "name": "A",
                "as": "aaa"
            }, {
                "name": "B",
                "as": "B"
            }, {
                "name": "C",
                "as": "C"
            }, {
                "name": "D",
                "as": "ddd"
            }]
        }];
        let exportExtractor = new ExportExtractor();
        let actualResult = exportExtractor.extract(file);
        assert.deepEqual(actualResult, expectedResult);
    });
});

