import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, GetAccessorDeclaration, ClassDeclaration, PropertyDeclaration, MethodDeclaration, ParameterDeclaration } from 'ts-morph';
import { DecoratorExtractor, DecoratableType } from '../../../extractors/decorator/DecoratorExtractor';
import { DecoratorInfo } from "../../../extractors/decorator/DecoratorInfo";

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

describe('DecoratorExtractor', function () {

    let project: Project;
    let decoratorExtractor: DecoratorExtractor;

    beforeEach(() => {
        project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });

        decoratorExtractor = new DecoratorExtractor();
    });

    it('should return undefined for decorators on identifiers', () => {
        // arrange
        const sut = `@invalidDecoratorUsage
        var id: number`;
        const file = project.createSourceFile('sut.ts', sut);

        // act
        file.forEachDescendant(node => {
            let decoratorInfos = decoratorExtractor.extract(<DecoratableType>node);

            assert.isUndefined(decoratorInfos);
        });
    });

    it('should extract non-decorator factory from a class', () => {
        // arrange
        const sut = `@autoinject
        export class Test{}`;
        const file = project.createSourceFile('sut.ts', sut);

        // act
        file.forEachDescendant(node => {
            if (node.getKind() === SyntaxKind.ClassDeclaration) {
                let decoratorInfos = decoratorExtractor.extract(<DecoratableType>node);

                if (decoratorInfos !== undefined) {
                    // assert
                    assert.equal(decoratorInfos.length, 1);
                    assert.equal(decoratorInfos[0].isDecoratorFactory, false);
                    assert.equal(decoratorInfos[0].name, 'autoinject');
                    assert.equal(decoratorInfos[0].text, '@autoinject');
                    assert.equal(decoratorInfos[0].parameters, undefined);
                }
            }
        });
    });

    it('should extract decorator factory from a class', () => {
        // arrange
        const sut = `@autoinject() class Test{}`;
        const file = project.createSourceFile('sut.ts', sut);

        // act
        file.forEachDescendant(node => {
            if (node.getKind() === SyntaxKind.ClassDeclaration) {

                let decoratorInfos = decoratorExtractor.extract(<DecoratableType>node);

                if (decoratorInfos !== undefined) {
                    // assert
                    assert.equal(decoratorInfos.length, 1);
                    assert.equal(decoratorInfos[0].isDecoratorFactory, true);
                    assert.equal(decoratorInfos[0].name, 'autoinject');
                    assert.equal(decoratorInfos[0].text, '@autoinject()');
                    assert.equal(decoratorInfos[0].parameters, undefined);
                }
            }
        });
    });

    it('should filter non-decorator factory "filterDecorator" from class', () => {
        // arrange
        const sut = `@autoinject
        @filterDecorator
        export class Test{}`;
        const file = project.createSourceFile('sut.ts', sut);


        const filterStrategy = (d: DecoratorInfo) => {
            return d.name === 'filterDecorator';
        };

        // act
        file.forEachDescendant(node => {
            let decoratorInfos = decoratorExtractor.extract(<DecoratableType>node,
                filterStrategy);

            if (decoratorInfos !== undefined) {
                // assert
                assert.equal(decoratorInfos.length, 1);
                assert.equal(decoratorInfos[0].isDecoratorFactory, false);
                assert.equal(decoratorInfos[0].name, 'filterDecorator');
                assert.equal(decoratorInfos[0].text, '@filterDecorator');
                assert.equal(decoratorInfos[0].parameters, undefined);
            }
        });
    });

    it(`should return two decorators, one for class, and another for property`, () => {

        // arrange
        const sut = `@autoinject
        class Test{
            @another
            private id:number = 11;
        }`;
        const file = project.createSourceFile('sut.ts', sut);
        let allDecorators: DecoratorInfo[] = [];

        // act
        file.forEachDescendant(node => {
            let decoratorInfos = decoratorExtractor.extract(<DecoratableType>node);
            if (decoratorInfos !== undefined) {
                decoratorInfos.forEach(di => {
                    allDecorators.push(di);
                });
            }
        });

        // assert
        assert.equal(allDecorators.length, 2);
        assert.equal(allDecorators[0].name, 'autoinject');
        assert.equal(allDecorators[1].name, 'another');
    });

    it('should return a factory decorator with one argument', () => {

        const sut = `@inject(ISample)
        class Test(){ }`;

        const file = project.createSourceFile('sut.ts', sut);

        file.forEachDescendant(node =>{
            let decoratorInfos = decoratorExtractor.extract(<DecoratableType>node);

            if( decoratorInfos != null ){

                assert.equal(decoratorInfos.length , 1);
                assert.equal(decoratorInfos[0].isDecoratorFactory , true);
                assert.equal(decoratorInfos[0].name , 'inject');
                assert.equal(decoratorInfos[0].name , '@inject(ISample)');

                assert.isTrue( decoratorInfos[0].parameters !== undefined );
                assert.isTrue( decoratorInfos[0].parameters[0] !== undefined );

                assert.equal(decoratorInfos[0].parameters.length , 1);
                assert.equal(decoratorInfos[0].parameters[0].name, 'ISample');
                assert.equal(decoratorInfos[0].parameters[0].text, 'ISample');
            }
        });

    });

    // it('should return correct DecoratorInfo', function () {
    //     const file = project.createSourceFile("test.ts", decoratorSample);
    //     let actualResult: any[] = [];
    //     let expectedResult: any[] = [[{
    //         "isDecoratorFactory": true,
    //         "name": "test1",
    //         "parameters": [{
    //             "kind": 13,
    //             "kindName": "Number",
    //             "type": "1"
    //         }, {
    //             "kind": 15,
    //             "kindName": "String",
    //             "type": "\"A\""
    //         }, {
    //             "kind": 10,
    //             "kindName": "Json",
    //             "type": [{
    //                 "name": "w",
    //                 "value": "2"
    //             }]
    //         }]
    //     }
    //     ], [{
    //         "isDecoratorFactory": true,
    //         "name": "test2",
    //         "parameters": [{
    //             "kind": 10,
    //             "kindName": "Json",
    //             "type": [{
    //                 "name": "x",
    //                 "value": "3"
    //             }]
    //         }, {
    //             "kind": 13,
    //             "kindName": "Number",
    //             "type": "4"
    //         }]
    //     }
    //     ], undefined, undefined, [{
    //         "isDecoratorFactory": true,
    //         "name": "test3",
    //         "parameters": [{
    //             "kind": 10,
    //             "kindName": "Json",
    //             "type": [{
    //                 "name": "y",
    //                 "value": "6"
    //             }
    //             ]
    //         }, {
    //             "kind": 10,
    //             "kindName": "Json",
    //             "type": [{
    //                 "name": "z",
    //                 "value": "7"
    //             }]
    //         }]
    //     }
    //     ], [{
    //         "isDecoratorFactory": false,
    //         "name": "test4",
    //         "parameters": undefined
    //     }
    //     ], [{
    //         "isDecoratorFactory": true,
    //         "name": "test5",
    //         "parameters": undefined
    //     }
    //     ]];
    //     file.forEachDescendant(x => {
    //         switch (x.getKind()) {
    //             case SyntaxKind.ClassDeclaration:
    //                 let decVisitor1 = new DecoratorExtractor();
    //                 let dec1 = decVisitor1.extract(<ClassDeclaration>x);
    //                 actualResult.push(dec1);
    //                 break;
    //             case SyntaxKind.MethodDeclaration:
    //                 let decVisitor2 = new DecoratorExtractor();
    //                 let dec2 = decVisitor2.extract(<MethodDeclaration>x);
    //                 actualResult.push(dec2);
    //                 break;
    //             case SyntaxKind.PropertyDeclaration:
    //                 let decVisitor3 = new DecoratorExtractor();
    //                 let dec3 = decVisitor3.extract(<PropertyDeclaration>x);
    //                 actualResult.push(dec3);
    //                 break;
    //             case SyntaxKind.GetAccessor:
    //                 let decVisitor4 = new DecoratorExtractor();
    //                 let dec4 = decVisitor4.extract(<GetAccessorDeclaration>x);
    //                 actualResult.push(dec4);
    //                 break;
    //             case SyntaxKind.Parameter:
    //                 let decVisitor5 = new DecoratorExtractor();
    //                 let dec5 = decVisitor5.extract(<ParameterDeclaration>x);
    //                 actualResult.push(dec5);
    //                 break;
    //         }
    //     });
    //     assert.deepEqual(actualResult, expectedResult);
    // });
});

