import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, EnumDeclaration } from 'ts-morph';
import { EnumInfo } from '../../../extractors/enum/EnumInfo';
import { EnumExtractor } from '../../../extractors/enum/EnumExtractor';
import { StringUtils } from '../../../utilities/StringUtils';

const enumSample = `
export enum MediaType {
    Book = 10,
    Video,
    Blog,
    Article,
    Podcast
}
enum State {
    "on",
    "off"
}
export enum Response {
    No = 0,
    Yes = 1,
}
enum Heterogeneous {
    No = 0,
    Yes = "YES",
}
const enum Test {
    A = 1,
    B = A * 2
}`;


describe('Enum Extractor', function () {
    it('should return correct EnumInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", enumSample);
        let actualResult: EnumInfo[] = [];
        let expectedResult: EnumInfo[] = [{
            "name": "MediaType",
            "modifiers": ["export"],
            "isConst": false,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "members": [{
                "name": "Book",
                "value": 10,
                "trailingComments": undefined,
                "leadingComments": undefined
            }, {
                "name": "Video",
                "value": 11,
                "trailingComments": undefined,
                "leadingComments": undefined
            }, {
                "name": "Blog",
                "value": 12,
                "trailingComments": undefined,
                "leadingComments": undefined
            }, {
                "name": "Article",
                "value": 13,
                "trailingComments": undefined,
                "leadingComments": undefined
            }, {
                "name": "Podcast",
                "value": 14,
                "trailingComments": undefined,
                "leadingComments": undefined
            }]
        }, {
            "name": "State",
            "modifiers": undefined,
            "isConst": false,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "members": [{
                "name": "\"on\"",
                "value": 0,
                "trailingComments": undefined,
                "leadingComments": undefined
            }, {
                "name": "\"off\"",
                "value": 1,
                "trailingComments": undefined,
                "leadingComments": undefined
            }]
        }, {
            "name": "Response",
            "modifiers": ["export"],
            "isConst": false,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "members": [{
                "name": "No",
                "value": 0,
                "trailingComments": undefined,
                "leadingComments": undefined
            }, {
                "name": "Yes",
                "value": 1,
                "trailingComments": undefined,
                "leadingComments": undefined
            }]
        }, {
            "name": "Heterogeneous",
            "modifiers": undefined,
            "isConst": false,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "members": [{
                "name": "No",
                "value": 0,
                "trailingComments": undefined,
                "leadingComments": undefined
            }, {
                "name": "Yes",
                "value": "YES",
                "trailingComments": undefined,
                "leadingComments": undefined
            }]
        }, {
            "name": "Test",
            "modifiers": ["const"],
            "isConst": true,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "members": [{
                "name": "A",
                "value": 1,
                "trailingComments": undefined,
                "leadingComments": undefined
            }, {
                "name": "B",
                "value": 2,
                "trailingComments": undefined,
                "leadingComments": undefined
            }]
        }];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.EnumDeclaration:
                    let enumEx = new EnumExtractor();
                    let enums = enumEx.extract(<EnumDeclaration>x);
                    actualResult.push(enums);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

