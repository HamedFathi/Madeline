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
            "kind": 1,
            "kindName": "DefaultImport"
        }, {
            "name": "name",
            "module": "module-name",
            "alias": undefined,
            "kind": 0,
            "kindName": "NamespaceImport"
        }, {
            "name": "export1",
            "module": "module-name",
            "alias": undefined,
            "kind": 2,
            "kindName": "NamedImport"
        }, {
            "name": "export1",
            "alias": "alias1",
            "module": "module-name",
            "kind": 2,
            "kindName": "NamedImport"
        }, {
            "name": "export1",
            "module": "module-name",
            "alias": undefined,
            "kind": 2,
            "kindName": "NamedImport"
        }, {
            "name": "export2",
            "module": "module-name",
            "alias": undefined,
            "kind": 2,
            "kindName": "NamedImport"
        }, {
            "name": "export1",
            "alias": "alias1",
            "module": "module-name",
            "kind": 2,
            "kindName": "NamedImport"
        }, {
            "name": "export2",
            "alias": "alias2",
            "module": "module-name",
            "kind": 2,
            "kindName": "NamedImport"
        }, {
            "name": "export1",
            "module": "module-name",
            "alias": undefined,
            "kind": 2,
            "kindName": "NamedImport"
        }, {
            "name": "defaultExport",
            "module": "module-name",
            "alias": undefined,
            "kind": 1,
            "kindName": "DefaultImport"
        }, {
            "name": "defaultExport",
            "module": "module-name",
            "alias": undefined,
            "kind": 1,
            "kindName": "DefaultImport"
        }, {
            "name": "name",
            "module": "module-name",
            "alias": undefined,
            "kind": 0,
            "kindName": "NamespaceImport"
        }];

        let imp = new ImportExtractor();
        let imports = imp.extract(file);
        actualResult = imports;
        assert.deepEqual(actualResult, expectedResult);
    });
});