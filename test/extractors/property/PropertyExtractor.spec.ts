import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration } from 'ts-morph';
import { PropertyInfo } from '../../../extractors/property/PropertyInfo';
import { PropertyExtractor } from '../../../extractors/property/PropertyExtractor';
import { StringUtils } from '../../../utilities/StringUtils';

const propSample = `
export class Test {
    pause: false | 'hover' = false;
    interval: number | string = 5000;
    prevTitle?: string;
    nextTitle: string;
}`;


describe('Property Extractor', function () {
    it('should return correct PropertyInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", propSample);
        let actualResult: any = [];
        let expectedResult: any = [{
            "name": "pause",
            "type": {
                "kind": 19,
                "kindName": "Union",
                "type": ["false", "\"hover\""]
            },
            "modifiers": undefined,
            "isOptional": false,
            "defaultValue": "false",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "decorators": undefined
        }, {
            "name": "interval",
            "type": {
                "kind": 19,
                "kindName": "Union",
                "type": ["string", "number"]
            },
            "modifiers": undefined,
            "isOptional": false,
            "defaultValue": "5000",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "decorators": undefined
        }, {
            "name": "prevTitle",
            "type": {
                "kind": 15,
                "kindName": "String",
                "type": "string"
            },
            "modifiers": undefined,
            "isOptional": true,
            "defaultValue": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "decorators": undefined
        }, {
            "name": "nextTitle",
            "type": {
                "kind": 15,
                "kindName": "String",
                "type": "string"
            },
            "modifiers": undefined,
            "isOptional": false,
            "defaultValue": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "decorators": undefined
        }];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let propEx = new PropertyExtractor();
                    let props = propEx.extractFromClass(<ClassDeclaration>x);
                    actualResult = props;
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

