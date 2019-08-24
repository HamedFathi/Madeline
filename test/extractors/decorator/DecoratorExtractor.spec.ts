import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, GetAccessorDeclaration, ClassDeclaration, PropertyDeclaration, MethodDeclaration, ParameterDeclaration } from 'ts-morph';
import { DecoratorExtractor } from '../../../extractors/decorator/DecoratorExtractor';
import { StringUtils } from '../../../utilities/StringUtils';

const decoratorSample = `
@test1(1,'A',{w:2})
export class A {
    @test2({x:3},4)
    d: number;
    e: string = 'e';
    f?: number = 5;
    @test3({y:6},{z:7})
    dec(@test4 g:number): number
    {
        return g;
    }
    @test5()
    public get name(): string {
        return 'decorator';
    }
}
`;

describe('Decorator Extractor', function () {
    it('should return correct DecoratorInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", decoratorSample);
        let actualResult: any[] = [];
        let expectedResult: any[] = [[{
            "isDecoratorFactory": true,
            "name": "test1",
            "parameters": [{
                "kind": 13,
                "kindName": "Number",
                "type": "1"
            }, {
                "kind": 15,
                "kindName": "String",
                "type": "\"A\""
            }, {
                "kind": 10,
                "kindName": "Json",
                "type": [{
                    "name": "w",
                    "value": "2"
                }]
            }]
        }
        ], [{
            "isDecoratorFactory": true,
            "name": "test2",
            "parameters": [{
                "kind": 10,
                "kindName": "Json",
                "type": [{
                    "name": "x",
                    "value": "3"
                }]
            }, {
                "kind": 13,
                "kindName": "Number",
                "type": "4"
            }]
        }
        ], undefined, undefined, [{
            "isDecoratorFactory": true,
            "name": "test3",
            "parameters": [{
                "kind": 10,
                "kindName": "Json",
                "type": [{
                    "name": "y",
                    "value": "6"
                }
                ]
            }, {
                "kind": 10,
                "kindName": "Json",
                "type": [{
                    "name": "z",
                    "value": "7"
                }]
            }]
        }
        ], [{
            "isDecoratorFactory": false,
            "name": "test4",
            "parameters": undefined
        }
        ], [{
            "isDecoratorFactory": true,
            "name": "test5",
            "parameters": undefined
        }
        ]];
        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ClassDeclaration:
                    let decVisitor1 = new DecoratorExtractor();
                    let dec1 = decVisitor1.extract(<ClassDeclaration>x);
                    actualResult.push(dec1);
                    break;
                case SyntaxKind.MethodDeclaration:
                    let decVisitor2 = new DecoratorExtractor();
                    let dec2 = decVisitor2.extract(<MethodDeclaration>x);
                    actualResult.push(dec2);
                    break;
                case SyntaxKind.PropertyDeclaration:
                    let decVisitor3 = new DecoratorExtractor();
                    let dec3 = decVisitor3.extract(<PropertyDeclaration>x);
                    actualResult.push(dec3);
                    break;
                case SyntaxKind.GetAccessor:
                    let decVisitor4 = new DecoratorExtractor();
                    let dec4 = decVisitor4.extract(<GetAccessorDeclaration>x);
                    actualResult.push(dec4);
                    break;
                case SyntaxKind.Parameter:
                    let decVisitor5 = new DecoratorExtractor();
                    let dec5 = decVisitor5.extract(<ParameterDeclaration>x);
                    actualResult.push(dec5);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

