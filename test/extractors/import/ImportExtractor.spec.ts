import { assert } from "chai";
import { Project, ScriptTarget } from 'ts-morph';
import { ImportExtractor } from '../../../extractors/import/ImportExtractor';


const importSample = `
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export1 , export2 } from "module-name";
import { export1 as alias1 , export2 as alias2 } from "module-name";
import defaultExport, { export1 } from "module-name";
import defaultExport, * as name from "module-name";
`;

describe('Import Extractor', function () {
    it('should return correct ImportInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", importSample);
        let actualResult: any;
        let expectedResult: any = [{
            "name": "defaultExport",
            "module": "module-name",
            "alias": undefined,
            "kind": 1
        }, {
            "name": "name",
            "module": "module-name",
            "alias": undefined,
            "kind": 0
        }, {
            "name": "export1",
            "module": "module-name",
            "alias": undefined,
            "kind": 2
        }, {
            "name": "export1",
            "alias": "alias1",
            "module": "module-name",
            "kind": 2
        }, {
            "name": "export1",
            "module": "module-name",
            "alias": undefined,
            "kind": 2
        }, {
            "name": "export2",
            "module": "module-name",
            "alias": undefined,
            "kind": 2
        }, {
            "name": "export1",
            "alias": "alias1",
            "module": "module-name",
            "kind": 2
        }, {
            "name": "export2",
            "alias": "alias2",
            "module": "module-name",
            "kind": 2
        }, {
            "name": "export1",
            "module": "module-name",
            "alias": undefined,
            "kind": 2
        }, {
            "name": "defaultExport",
            "module": "module-name",
            "alias": undefined,
            "kind": 1
        }, {
            "name": "defaultExport",
            "module": "module-name",
            "alias": undefined,
            "kind": 1
        }, {
            "name": "name",
            "module": "module-name",
            "alias": undefined,
            "kind": 0
        }];

        let imp = new ImportExtractor();
        let imports = imp.extract(file);
        actualResult = imports;
        assert.deepEqual(actualResult, expectedResult);
    });
});