import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, EnumDeclaration, FunctionDeclaration } from 'ts-morph';
import { FunctionInfo } from '../../../extractors/function/FunctionInfo';
import { FunctionExtractor } from '../../../extractors/function/FunctionExtractor';
import { StringUtils } from '../../../utilities/StringUtils';

const funcSample = `
function addNumbers(...numbers:number[]) {}
export function addNumbers() {}
function calculate(price:number,rate:number = 0.50) {}
export default function buildName(firstName: string, lastName?: string) {}
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {}
async function asyncCall() {}
`;

describe('Function Extractor', function () {
    it('should return correct FunctionInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", funcSample);
        let actualResult: FunctionInfo[] = [];
        let expectedResult: FunctionInfo[] = [{
            "name": "addNumbers",
            "modifiers": undefined,
            "isGenerator": false,
            "isOverload": false,
            "isImplementation": true,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "params": [{
                "name": "numbers",
                "type": {
                    "kind": 2,
                    "kindName": "Array",
                    "type": "number[]"
                },
                "modifiers": undefined,
                "isOptional": true,
                "isRest": true,
                "isParameterProperty": false,
                "defaultValue": undefined
            }
            ]
        }, {
            "name": "addNumbers",
            "modifiers": ["export"],
            "isGenerator": false,
            "isOverload": false,
            "isImplementation": true,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "params": undefined
        }, {
            "name": "calculate",
            "modifiers": undefined,
            "isGenerator": false,
            "isOverload": false,
            "isImplementation": true,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "params": [{
                "name": "price",
                "type": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "number"
                },
                "modifiers": undefined,
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined
            }, {
                "name": "rate",
                "type": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "number"
                },
                "modifiers": undefined,
                "isOptional": true,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": "0.50"
            }
            ]
        }, {
            "name": "buildName",
            "modifiers": ["export", "default"],
            "isGenerator": false,
            "isOverload": false,
            "isImplementation": true,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "params": [{
                "name": "firstName",
                "type": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                },
                "modifiers": undefined,
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined
            }, {
                "name": "lastName",
                "type": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                },
                "modifiers": undefined,
                "isOptional": true,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined
            }
            ]
        }, {
            "name": "pickCard",
            "modifiers": undefined,
            "isGenerator": false,
            "isOverload": true,
            "isImplementation": false,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "params": [{
                "name": "x",
                "type": {
                    "kind": 2,
                    "kindName": "Array",
                    "type": "{ suit: string; card: number; }[]"
                },
                "modifiers": undefined,
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined
            }
            ]
        }, {
            "name": "pickCard",
            "modifiers": undefined,
            "isGenerator": false,
            "isOverload": true,
            "isImplementation": false,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "params": [{
                "name": "x",
                "type": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "number"
                },
                "modifiers": undefined,
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined
            }
            ]
        }, {
            "name": "pickCard",
            "modifiers": undefined,
            "isGenerator": false,
            "isOverload": false,
            "isImplementation": true,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "params": [{
                "name": "x",
                "type": {
                    "kind": 1,
                    "kindName": "Any",
                    "type": "any"
                },
                "modifiers": undefined,
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined
            }
            ]
        }, {
            "name": "asyncCall",
            "modifiers": ["async"],
            "isGenerator": false,
            "isOverload": false,
            "isImplementation": true,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "namespaces": undefined,
            "params": undefined
        }];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.FunctionDeclaration:
                    let funcEx = new FunctionExtractor();
                    let func = funcEx.extract(<FunctionDeclaration>x);
                    actualResult.push(func);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});
