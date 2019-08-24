import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration } from 'ts-morph';
import { MethodExtractor } from '../../../extractors/method/MethodExtractor';
import { StringUtils } from '../../../utilities/StringUtils';

const methodSample = `
export default class Greeter {
    greet() {
        return "Hello";
    }
    async move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
    getFullName(firstName: string ,lastName: string, middleName?:string) {
        return firstName + middleName + lastName;
      }
}`;


describe('Method Extractor', function () {
    it('should return correct MethodInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", methodSample);
        let actualResult: any = [];
        let expectedResult: any = [{
            "name": "greet",
            "modifiers": undefined,
            "returnType": {
                "kind": 15,
                "kindName": "String",
                "type": "string"
            },
            "isGenerator": false,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "decorators": undefined,
            "parameters": undefined
        }, {
            "name": "move",
            "modifiers": ["async"],
            "returnType": {
                "kind": 22,
                "kindName": "Promise",
                "type": "Promise<void>"
            },
            "isGenerator": false,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "decorators": undefined,
            "parameters": [{
                "name": "distanceInMeters",
                "type": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "number"
                },
                "isOptional": true,
                "isRest": false,
                "isParameterProperty": false,
                "modifiers": undefined,
                "defaultValue": "5",
                "decorators": undefined
            }
            ]
        }, {
            "name": "getFullName",
            "modifiers": undefined,
            "returnType": {
                "kind": 15,
                "kindName": "String",
                "type": "string"
            },
            "isGenerator": false,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "decorators": undefined,
            "parameters": [{
                "name": "firstName",
                "type": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                },
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": false,
                "modifiers": undefined,
                "defaultValue": undefined,
                "decorators": undefined
            }, {
                "name": "lastName",
                "type": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                },
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": false,
                "modifiers": undefined,
                "defaultValue": undefined,
                "decorators": undefined
            }, {
                "name": "middleName",
                "type": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                },
                "isOptional": true,
                "isRest": false,
                "isParameterProperty": false,
                "modifiers": undefined,
                "defaultValue": undefined,
                "decorators": undefined
            }]
        }];
        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let methodEx = new MethodExtractor();
                    let methods = methodEx.extract(<ClassDeclaration>x);
                    actualResult = methods;
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

