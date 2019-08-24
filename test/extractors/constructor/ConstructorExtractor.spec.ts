import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration } from 'ts-morph';
import { ConstructorExtractor } from '../../../extractors/constructor/ConstructorExtractor';
import { StringUtils } from '../../../utilities/StringUtils';

const ctorSample = `
export class A extends B {
    constructor(ic: IC, id: ID, ie?: IE) {
        super();
    }
}
export class B {
    constructor() {
    }
}
export class G {
    constructor();
    constructor(obj: IE); 
    constructor(obj?: any) {}
}
export class H {
    constructor() {}
    constructor(private value?: ID) {} 
    constructor(private value: number) {}
}
class F {}
class J {
    constructor(bar: string = "bar") {}
}
interface IC {}
interface ID {}
interface IE {}
`;


describe('Constructor Extractor', function () {
    it('should return correct ConstructorInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        let actualResult: Array<any> = [];
        let expectedResult: Array<any> = [];
        // Class A
        let expectedResult1: any = [{
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modifiers": undefined,
            "isParameterLess": false,
            "isImplementation": true,
            "isOverload": false,
            "parameters": [{
                "name": "ic",
                "type": {
                    "kind": 8,
                    "kindName": "Interface",
                    "type": "IC"
                },
                "modifiers": undefined,
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined,
                "decorators": undefined
            }, {
                "name": "id",
                "type": {
                    "kind": 8,
                    "kindName": "Interface",
                    "type": "ID"
                },
                "modifiers": undefined,
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined,
                "decorators": undefined
            }, {
                "name": "ie",
                "type": {
                    "kind": 8,
                    "kindName": "Interface",
                    "type": "IE"
                },
                "modifiers": undefined,
                "isOptional": true,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined,
                "decorators": undefined
            }]
        }];
        // Class B - it has a parameter-less constructor so returns [[]].
        let expectedResult2: any = [{
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modifiers": undefined,
            "isParameterLess": true,
            "isImplementation": true,
            "isOverload": false,
            "parameters": undefined
        }];
        // Class G - multiple constructors - Type 1
        let expectedResult3: any = [{
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modifiers": undefined,
            "isParameterLess": false,
            "isImplementation": true,
            "isOverload": false,
            "parameters": [{
                "name": "obj",
                "type": {
                    "kind": 1,
                    "kindName": "Any",
                    "type": "any"
                },
                "modifiers": undefined,
                "isOptional": true,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": undefined,
                "decorators": undefined
            }]
        }];
        // Class H - multiple constructors - Type 2
        let expectedResult4: any = [{
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modifiers": undefined,
            "isParameterLess": true,
            "isImplementation": true,
            "isOverload": false,
            "parameters": undefined
        }, {
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modifiers": undefined,
            "isParameterLess": false,
            "isImplementation": true,
            "isOverload": false,
            "parameters": [{
                "name": "value",
                "type": {
                    "kind": 8,
                    "kindName": "Interface",
                    "type": "ID"
                },
                "modifiers": ["private"],
                "isOptional": true,
                "isRest": false,
                "isParameterProperty": true,
                "defaultValue": undefined,
                "decorators": undefined
            }
            ]
        }, {
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modifiers": undefined,
            "isParameterLess": false,
            "isImplementation": true,
            "isOverload": false,
            "parameters": [{
                "name": "value",
                "type": {
                    "kind": 8,
                    "kindName": "Interface",
                    "type": "ID"
                },
                "modifiers": ["private"],
                "isOptional": false,
                "isRest": false,
                "isParameterProperty": true,
                "defaultValue": undefined,
                "decorators": undefined
            }]
        }];
        // Class F - it has not any constructor so returns undefined.
        let expectedResult5: any = undefined;
        // Class J - it has a constructor with default value.
        let expectedResult6: any = [{
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modifiers": undefined,
            "isParameterLess": false,
            "isImplementation": true,
            "isOverload": false,
            "parameters": [{
                "name": "bar",
                "type": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                },
                "modifiers": undefined,
                "isOptional": true,
                "isRest": false,
                "isParameterProperty": false,
                "defaultValue": "\"bar\"",
                "decorators": undefined
            }]
        }];
        expectedResult.push(expectedResult1, expectedResult2, expectedResult3, expectedResult4, expectedResult5, expectedResult6);

        const file = project.createSourceFile("test.ts", ctorSample);
        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let ctorVisitor = new ConstructorExtractor();
                    let ctor = ctorVisitor.extract(<ClassDeclaration>x);
                    actualResult.push(ctor);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});
