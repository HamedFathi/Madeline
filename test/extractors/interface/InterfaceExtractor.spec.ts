import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, EnumDeclaration, InterfaceDeclaration } from 'ts-morph';
import { InterfaceInfo } from '../../../extractors/interface/InterfaceInfo';
import { StringUtils } from '../../../utilities/StringUtils';
import { InterfaceExtractor } from '../../../extractors/interface/InterfaceExtractor';

const interfaceSample = `
export default interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
export interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
    set(name: string,obj: {a:'A'}): number;
}
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
interface Circle {
    new(n: string): Shape;
}
`;


describe('Interface Extractor', function () {
    it('should return correct InterfaceInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", interfaceSample);
        let actualResult: InterfaceInfo[] = [];
        let expectedResult: InterfaceInfo[] = [{
            "name": "SquareConfig",
            "modifiers": ["export", "default"],
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "typeParameters": undefined,
            "properties": [{
                "name": "color",
                "type": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                },
                "isOptional": true,
                "trailingComments": undefined,
                "leadingComments": undefined
            }, {
                "name": "width",
                "type": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "number"
                },
                "isOptional": true,
                "trailingComments": undefined,
                "leadingComments": undefined
            }
            ],
            "methods": undefined,
            "extends": undefined,
            "callSignatures": undefined,
            "indexers": [{
                "returnType": {
                    "kind": 1,
                    "kindName": "Any",
                    "type": "any"
                },
                "key": "propName",
                "value": "string",
                "trailingComments": undefined,
                "leadingComments": undefined
            }
            ],
            "constructors": undefined
        }, {
            "name": "Counter",
            "modifiers": ["export"],
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "typeParameters": undefined,
            "properties": [{
                "name": "interval",
                "type": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "number"
                },
                "isOptional": false,
                "trailingComments": undefined,
                "leadingComments": undefined
            }
            ],
            "methods": [{
                "name": "reset",
                "returnType": {
                    "kind": 21,
                    "kindName": "Void",
                    "type": "void"
                },
                "trailingComments": undefined,
                "leadingComments": undefined,
                "parameters": undefined
            }, {
                "name": "set",
                "returnType": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "number"
                },
                "trailingComments": undefined,
                "leadingComments": undefined,
                "parameters": [{
                    "name": "name",
                    "type": {
                        "kind": 15,
                        "kindName": "String",
                        "type": "string"
                    },
                    "isOptional": false,
                    "isRest": false,
                    "isParameterProperty": false,
                    "defaultValue": undefined,
                    "modifiers": undefined
                }, {
                    "name": "obj",
                    "type": {
                        "kind": 10,
                        "kindName": "Json",
                        "type": [{
                            "name": "a",
                            "value": "\"A\""
                        }
                        ]
                    },
                    "isOptional": false,
                    "isRest": false,
                    "isParameterProperty": false,
                    "modifiers": undefined,
                    "defaultValue": undefined
                }
                ]
            }
            ],
            "extends": undefined,
            "callSignatures": [{
                "returnType": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                },
                "trailingComments": undefined,
                "leadingComments": undefined,
                "typeParameters": undefined,
                "parameters": [{
                    "name": "start",
                    "type": {
                        "kind": 13,
                        "kindName": "Number",
                        "type": "number"
                    },
                    "modifiers": undefined,
                    "isOptional": false,
                    "isRest": false,
                    "isParameterProperty": false,
                    "defaultValue": undefined,

                }
                ]
            }
            ],
            "indexers": undefined,
            "constructors": undefined
        }, {
            "name": "Shape",
            "modifiers": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "typeParameters": undefined,
            "properties": [{
                "name": "color",
                "type": {
                    "kind": 15,
                    "kindName": "String",
                    "type": "string"
                },
                "isOptional": false,
                "trailingComments": undefined,
                "leadingComments": undefined
            }
            ],
            "methods": undefined,
            "extends": undefined,
            "callSignatures": undefined,
            "indexers": undefined,
            "constructors": undefined
        }, {
            "name": "PenStroke",
            "modifiers": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "typeParameters": undefined,
            "properties": [{
                "name": "penWidth",
                "type": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "number"
                },
                "isOptional": false,
                "trailingComments": undefined,
                "leadingComments": undefined
            }
            ],
            "methods": undefined,
            "extends": undefined,
            "callSignatures": undefined,
            "indexers": undefined,
            "constructors": undefined
        }, {
            "name": "Square",
            "modifiers": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "typeParameters": undefined,
            "properties": [{
                "name": "sideLength",
                "type": {
                    "kind": 13,
                    "kindName": "Number",
                    "type": "number"
                },
                "isOptional": false,
                "trailingComments": undefined,
                "leadingComments": undefined
            }
            ],
            "methods": undefined,
            "extends": [{
                "name": "Shape",
                "type": {
                    "kind": 8,
                    "kindName": "Interface",
                    "type": "Shape"
                }
            }, {
                "name": "PenStroke",
                "type": {
                    "kind": 8,
                    "kindName": "Interface",
                    "type": "PenStroke"
                }
            }
            ],
            "callSignatures": undefined,
            "indexers": undefined,
            "constructors": undefined
        }, {
            "name": "Circle",
            "modifiers": undefined,
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "typeParameters": undefined,
            "properties": undefined,
            "methods": undefined,
            "extends": undefined,
            "callSignatures": undefined,
            "indexers": undefined,
            "constructors": [{
                "returnType": {
                    "kind": 8,
                    "kindName": "Interface",
                    "type": "Shape"
                },
                "trailingComments": undefined,
                "leadingComments": undefined,
                "parameters": [{
                    "name": "n",
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
                }]
            }]
        }];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.InterfaceDeclaration:
                    let interfaceEx = new InterfaceExtractor();
                    let interfaces = interfaceEx.extract(<InterfaceDeclaration>x);
                    actualResult.push(interfaces);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});