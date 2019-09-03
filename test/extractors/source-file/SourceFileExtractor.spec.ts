import { assert } from "chai";
import { Project, ScriptTarget } from 'ts-morph';
import { SourceFileExtractor } from '../../../extractors/source-file/SourceFileExtractor';
import { StringUtils } from '../../../utilities/StringUtils';

const srcSample = `
class Animal {
  constructor(public name: string) {}
  move(distanceInMeters: number = 0) {
    console.log(distanceInMeters);
  }
}  
class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}  
class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
`;

describe('Source File Extractor', function () {
    it('should return correct SourceFileInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", srcSample);
        let expectedResult: any = {
            "isDeclarationFile": false,
            "isFromExternalLibrary": false,
            "isInNodeModules": false,
            "imports": undefined,
            "coverage": {
                "details": [{
                    "name": "Animal",
                    "kind": 241,
                    "kindName": "ClassDeclaration",
                    "hasLeadingComment": false,
                    "hasTrailingComment": false,
                    "hasJsDoc": false
                }, {
                    "name": "move",
                    "kind": 157,
                    "kindName": "MethodDeclaration",
                    "hasLeadingComment": false,
                    "hasTrailingComment": false,
                    "hasJsDoc": false
                }, {
                    "name": "Snake",
                    "kind": 241,
                    "kindName": "ClassDeclaration",
                    "hasLeadingComment": false,
                    "hasTrailingComment": false,
                    "hasJsDoc": false
                }, {
                    "name": "move",
                    "kind": 157,
                    "kindName": "MethodDeclaration",
                    "hasLeadingComment": false,
                    "hasTrailingComment": false,
                    "hasJsDoc": false
                }, {
                    "name": "Horse",
                    "kind": 241,
                    "kindName": "ClassDeclaration",
                    "hasLeadingComment": false,
                    "hasTrailingComment": false,
                    "hasJsDoc": false
                }, {
                    "name": "move",
                    "kind": 157,
                    "kindName": "MethodDeclaration",
                    "hasLeadingComment": false,
                    "hasTrailingComment": false,
                    "hasJsDoc": false
                }
                ],
                "items": 6,
                "documented": {
                    "count": 0,
                    "jsDoc": 0,
                    "leading": 0,
                    "trailing": 0,
                    "percent": 0
                },
                "undocumented": {
                    "count": 6,
                    "jsDoc": 6,
                    "leading": 6,
                    "trailing": 6,
                    "percent": 100
                }
            },
            "enums": undefined,
            "functions": undefined,
            "typeAliases": undefined,
            "interfaces": undefined,
            "classes": [{
                "name": "Animal",
                "text": "\nclass Animal {\n  constructor(public name: string) {}\n  move(distanceInMeters: number = 0) {\n    console.log(distanceInMeters);\n  }\n}",
                "modifiers": undefined,
                "extends": undefined,
                "implements": undefined,
                "trailingComments": undefined,
                "leadingComments": undefined,
                "decorators": undefined,
                "modules": undefined,
                "constructors": [{
                    "trailingComments": undefined,
                    "leadingComments": undefined,
                    "modifiers": undefined,
                    "expressions": undefined,
                    "isParameterLess": false,
                    "isImplementation": true,
                    "isOverload": false,
                    "parameters": [{
                        "name": "name",
                        "type": {
                            "kind": 15,
                            "kindName": "String",
                            "type": "string"
                        },
                        "modifiers": ["public"],
                        "isOptional": false,
                        "isRest": false,
                        "isParameterProperty": true,
                        "defaultValue": undefined,
                        "decorators": undefined
                    }
                    ],
                    "variables": undefined
                }
                ],
                "properties": undefined,
                "getAccessors": undefined,
                "methods": [{
                    "name": "move",
                    "modifiers": undefined,
                    "returnType": {
                        "kind": 21,
                        "kindName": "Void",
                        "type": "void"
                    },
                    "isGenerator": false,
                    "trailingComments": undefined,
                    "leadingComments": undefined,
                    "decorators": undefined,
                    "variables": undefined,
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
                        "defaultValue": "0",
                        "decorators": undefined
                    }
                    ],
                    "expressions": [{
                        "text": "console.log(distanceInMeters);",
                        "trailingComments": undefined,
                        "leadingComments": undefined,
                        "modules": undefined
                    }
                    ]
                }
                ]
            }, {
                "name": "Snake",
                "text": "  \nclass Snake extends Animal {\n  constructor(name: string) {\n    super(name);\n  }\n  move(distanceInMeters = 5) {\n    console.log(\"Slithering...\");\n    super.move(distanceInMeters);\n  }\n}",
                "modifiers": undefined,
                "extends": "Animal",
                "implements": undefined,
                "trailingComments": undefined,
                "leadingComments": undefined,
                "decorators": undefined,
                "modules": undefined,
                "constructors": [{
                    "trailingComments": undefined,
                    "leadingComments": undefined,
                    "modifiers": undefined,
                    "isParameterLess": false,
                    "isImplementation": true,
                    "isOverload": false,
                    "expressions": [
                        {
                            "leadingComments": undefined,
                            "modules": undefined,
                            "text": "super(name);",
                            "trailingComments": undefined
                        }
                    ],
                    "parameters": [{
                        "name": "name",
                        "type": {
                            "kind": 15,
                            "kindName": "String",
                            "type": "string"
                        },
                        "modifiers": undefined,
                        "isOptional": false,
                        "isRest": false,
                        "isParameterProperty": false,
                        "defaultValue": undefined,
                        "decorators": undefined
                    }
                    ],
                    "variables": undefined
                }
                ],
                "properties": undefined,
                "getAccessors": undefined,
                "methods": [{
                    "name": "move",
                    "modifiers": undefined,
                    "returnType": {
                        "kind": 21,
                        "kindName": "Void",
                        "type": "void"
                    },
                    "isGenerator": false,
                    "trailingComments": undefined,
                    "leadingComments": undefined,
                    "decorators": undefined,
                    "variables": undefined,
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
                    ],
                    "expressions": [{
                        "text": "console.log(\"Slithering...\");",
                        "trailingComments": undefined,
                        "leadingComments": undefined,
                        "modules": undefined
                    }, {
                        "text": "super.move(distanceInMeters);",
                        "trailingComments": undefined,
                        "leadingComments": undefined,
                        "modules": undefined
                    }
                    ]
                }
                ]
            }, {
                "name": "Horse",
                "text": "  \nclass Horse extends Animal {\n  constructor(name: string) {\n    super(name);\n  }\n  move(distanceInMeters = 45) {\n    console.log(\"Galloping...\");\n    super.move(distanceInMeters);\n  }\n}",
                "modifiers": undefined,
                "extends": "Animal",
                "implements": undefined,
                "trailingComments": undefined,
                "leadingComments": undefined,
                "decorators": undefined,
                "modules": undefined,
                "constructors": [{
                    "trailingComments": undefined,
                    "leadingComments": undefined,
                    "modifiers": undefined,
                    "isParameterLess": false,
                    "isImplementation": true,
                    "isOverload": false,
                    "expressions": [
                        {
                            "leadingComments": undefined,
                            "modules": undefined,
                            "text": "super(name);",
                            "trailingComments": undefined
                        }
                    ],
                    "parameters": [{
                        "name": "name",
                        "type": {
                            "kind": 15,
                            "kindName": "String",
                            "type": "string"
                        },
                        "modifiers": undefined,
                        "isOptional": false,
                        "isRest": false,
                        "isParameterProperty": false,
                        "defaultValue": undefined,
                        "decorators": undefined
                    }
                    ],
                    "variables": undefined
                }
                ],
                "properties": undefined,
                "getAccessors": undefined,
                "methods": [{
                    "name": "move",
                    "modifiers": undefined,
                    "returnType": {
                        "kind": 21,
                        "kindName": "Void",
                        "type": "void"
                    },
                    "isGenerator": false,
                    "trailingComments": undefined,
                    "leadingComments": undefined,
                    "decorators": undefined,
                    "variables": undefined,
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
                        "defaultValue": "45",
                        "decorators": undefined
                    }
                    ],
                    "expressions": [{
                        "text": "console.log(\"Galloping...\");",
                        "trailingComments": undefined,
                        "leadingComments": undefined,
                        "modules": undefined
                    }, {
                        "text": "super.move(distanceInMeters);",
                        "trailingComments": undefined,
                        "leadingComments": undefined,
                        "modules": undefined
                    }
                    ]
                }
                ]
            }
            ],
            "variables": [[{
                "name": "sam",
                "type": {
                    "kind": 6,
                    "kindName": "Class",
                    "type": "Snake"
                },
                "modifiers": undefined,
                "value": "new Snake(\"Sammy the Python\")",
                "kind": "let",
                "kindName": "let",
                "trailingComments": undefined,
                "leadingComments": undefined,
                "modules": undefined
            }
            ], [{
                "name": "tom",
                "type": {
                    "kind": 6,
                    "kindName": "Class",
                    "type": "Animal"
                },
                "modifiers": undefined,
                "value": "new Horse(\"Tommy the Palomino\")",
                "kind": "let",
                "kindName": "let",
                "trailingComments": undefined,
                "leadingComments": undefined,
                "modules": undefined
            }
            ]],
            "exportAssignments": undefined,
            "expressions": [{
                "text": "sam.move();",
                "trailingComments": undefined,
                "leadingComments": undefined,
                "modules": undefined
            }, {
                "text": "tom.move(34);",
                "trailingComments": undefined,
                "leadingComments": undefined,
                "modules": undefined
            }]
        };
        let srcExtractor = new SourceFileExtractor();
        let actualResult = srcExtractor.extract(file);
        assert.deepEqual(actualResult, expectedResult);
    });
});

