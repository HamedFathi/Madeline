import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, VariableStatement, VariableDeclarationKind } from 'ts-morph';
import { VariableInfo } from '../../../extractors/variable/VariableInfo';
import { VariableExtractor } from '../../../extractors/variable/VariableExtractor';

const varSample = `
export const test = 1;
class Sample {
  public Get() {
    let a = 1;
  }
}
const obj = {
    propertyAssignment: 5,
    shorthandPropertyAssignment,
    ...spreadAssignment,
    get getAccessor() {
        return 5;
    },
    set setAccessor(value: number) {
        // do something
    },
    method() {
        return "some string"
    }
};
export const BasicConfiguration = {
  /**
   * Apply this configuration to the provided container.
   */
  register(container: IContainer): IContainer {
    return RuntimeBasicConfiguration
      .register(container)
      .register(
        ...DefaultComponents,
        ...DefaultBindingSyntax,
        ...DefaultBindingLanguage
      );
  },
  /**
   * Create a new container with this configuration applied to it.
   */
  createContainer(): IContainer {
    return this.register(DI.createContainer());
  }
};
`;

describe('Variable Extractor', function () {
    it('should return correct VariableInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", varSample);
        let actualResult: VariableInfo[][] = [];
        let expectedResult: VariableInfo[][] = [[{
            "name": "test",
            "type": {
                "kind": 13,
                "kindName": "Number",
                "type": "1"
            },
            "modifiers": ["export"],
            "value": "1",
            "kind": VariableDeclarationKind.Const,
            "kindName": "const",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "hasAsExpression": false
        }
        ], [{
            "name": "a",
            "type": {
                "kind": 13,
                "kindName": "Number",
                "type": "number"
            },
            "modifiers": undefined,
            "value": "1",
            "kind": VariableDeclarationKind.Let,
            "kindName": "let",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "hasAsExpression": false
        }
        ], [{
            "name": "obj",
            "type": {
                "kind": 1,
                "kindName": "Any",
                "type": "any"
            },
            "modifiers": undefined,
            "value": {
                "assignments": [{
                    "isShorthand": false,
                    "isSpread": false,
                    "name": "propertyAssignment",
                    "type": {
                        "kind": 13,
                        "kindName": "Number",
                        "type": "number"
                    },
                    "value": "5"
                }, {
                    "isShorthand": true,
                    "isSpread": false,
                    "name": "shorthandPropertyAssignment",
                    "type": {
                        "kind": 1,
                        "kindName": "Any",
                        "type": "any"
                    },
                    "value": undefined
                }, {
                    "isShorthand": false,
                    "isSpread": true,
                    "name": "spreadAssignment",
                    "type": {
                        "kind": 1,
                        "kindName": "Any",
                        "type": "any"
                    },
                    "value": undefined
                }
                ],
                "getAccessors": [{
                    "name": "getAccessor",
                    "returnType": {
                        "kind": 13,
                        "kindName": "Number",
                        "type": "number"
                    },
                    "expressions": undefined,
                    "modifiers": undefined,
                    "decorators": undefined,
                    "trailingComments": undefined,
                    "leadingComments": undefined,
                    "variables": undefined
                }
                ],
                "setAccessors": [{
                    "name": "setAccessor",
                    "parameter": {
                        "name": "value",
                        "modifiers": undefined,
                        "type": {
                            "kind": 13,
                            "kindName": "Number",
                            "type": "number"
                        }
                    },
                    "expressions": undefined,
                    "modifiers": undefined,
                    "decorators": undefined,
                    "trailingComments": undefined,
                    "leadingComments": undefined,
                    "variables": undefined
                }
                ],
                "methods": [{
                    "name": "method",
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
                    "variables": undefined,
                    "parameters": undefined,
                    "expressions": undefined
                }
                ]
            },
            "kind": VariableDeclarationKind.Const,
            "kindName": "const",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "hasAsExpression": false
        }
        ], [{
            "name": "BasicConfiguration",
            "type": {
                "kind": 10,
                "kindName": "Json",
                "type": "{ register(container: any): any; createContainer(): any; }"
            },
            "modifiers": ["export"],
            "value": {
                "assignments": [],
                "getAccessors": [],
                "setAccessors": [],
                "methods": [{
                    "name": "register",
                    "modifiers": undefined,
                    "returnType": {
                        "kind": 1,
                        "kindName": "Any",
                        "type": "any"
                    },
                    "isGenerator": false,
                    "trailingComments": undefined,
                    "leadingComments": [{
                        "text": "/**\n   * Apply this configuration to the provided container.\n   */",
                        "kind": 1,
                        "kindName": "JsMultiLine",
                        "description": ["Apply this configuration to the provided container."],
                        "tags": undefined
                    }
                    ],
                    "decorators": undefined,
                    "variables": undefined,
                    "parameters": [{
                        "name": "container",
                        "type": {
                            "kind": 1,
                            "kindName": "Any",
                            "type": "any"
                        },
                        "isOptional": false,
                        "isRest": false,
                        "isParameterProperty": false,
                        "modifiers": undefined,
                        "defaultValue": undefined,
                        "decorators": undefined
                    }
                    ],
                    "expressions": undefined
                }, {
                    "name": "createContainer",
                    "modifiers": undefined,
                    "returnType": {
                        "kind": 1,
                        "kindName": "Any",
                        "type": "any"
                    },
                    "isGenerator": false,
                    "trailingComments": undefined,
                    "leadingComments": [{
                        "text": "/**\n   * Create a new container with this configuration applied to it.\n   */",
                        "kind": 1,
                        "kindName": "JsMultiLine",
                        "description": ["Create a new container with this configuration applied to it."],
                        "tags": undefined
                    }
                    ],
                    "decorators": undefined,
                    "variables": undefined,
                    "parameters": undefined,
                    "expressions": undefined
                }
                ]
            },
            "kind": VariableDeclarationKind.Const,
            "kindName": "const",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined,
            "hasAsExpression": false
        }
        ]];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.VariableStatement:
                    let varVisitor = new VariableExtractor();
                    let vars = varVisitor.extract(<VariableStatement>x);
                    actualResult.push(vars);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

