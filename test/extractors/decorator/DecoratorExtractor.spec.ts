import { assert } from 'chai';
import { Project, ScriptTarget, SyntaxKind } from 'ts-morph';
import { DecoratorExtractor } from '../../../extractors/decorator/DecoratorExtractor';
import { DecoratorInfo } from '../../../extractors/decorator/DecoratorInfo';
import { DecoratableType } from '../../../extractors/decorator/DecoratableType';

// const decoratorSample = `
// @test1(1,'A',{w:2})
// export class A {
//     @test2({x:3},4)
//     d: number;
//     e: string = 'e';
//     f?: number = 5;
//     @test3({y:6},{z:7})
//     dec(@test4 g:number): number
//     {
//         return g;
//     }
//     @test5()
//     public get name(): string {
//         return 'decorator';
//     }
// }
// `;

describe('DecoratorExtractor', function() {
    let project: Project;
    let decoratorExtractor: DecoratorExtractor;

    beforeEach(() => {
        project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5,
            },
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
            const decoratorInfos = decoratorExtractor.extract(node as DecoratableType);

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
                const decoratorInfos = decoratorExtractor.extract(node as DecoratableType);

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
                const decoratorInfos = decoratorExtractor.extract(node as DecoratableType);

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
            const decoratorInfos = decoratorExtractor.extract(node as DecoratableType, filterStrategy);

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
        const allDecorators: DecoratorInfo[] = [];

        // act
        file.forEachDescendant(node => {
            const decoratorInfos = decoratorExtractor.extract(node as DecoratableType);
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

    it('should return a factory decorator with one argument named Sample', () => {
        const sampleText = `export class Sample { }`;
        const sut = `
        import {Sample} from './sample';
        import {inject} from './decorator';
        @inject(Sample)
        class Test(){ }
        `;

        project.createSourceFile('sample.ts', sampleText, { overwrite: true });
        const programFile = project.createSourceFile('sut.ts', sut, { overwrite: true });

        programFile.forEachDescendant(node => {
            const decoratorInfos = decoratorExtractor.extract(node as DecoratableType);

            if (decoratorInfos != null) {
                assert.equal(decoratorInfos.length, 1);
                assert.equal(decoratorInfos[0].isDecoratorFactory, true);
                assert.equal(decoratorInfos[0].name, 'inject');
                assert.equal(decoratorInfos[0].text, '@inject(Sample)');

                assert.isTrue(decoratorInfos[0].parameters !== undefined);
                assert.equal(decoratorInfos[0].parameters.length, 1);
                assert.isTrue(decoratorInfos[0].parameters[0] !== undefined);

                assert.equal(decoratorInfos[0].parameters[0].value, 'Sample');
                assert.equal(decoratorInfos[0].parameters[0].type.text, 'typeof Sample');

                /*
                let lastIndexOf = decoratorInfos[0].parameters[0].type.fullText.lastIndexOf('.') + 1;
                assert.equal(decoratorInfos[0].parameters[0].type.fullText.substr(lastIndexOf), 'Sample');

                assert.isTrue(decoratorInfos[0].parameters[0].type.details !== undefined);
                assert.equal(decoratorInfos[0].parameters[0].type.details.length, 1);

                lastIndexOf = decoratorInfos[0].parameters[0].type.details[0].text.lastIndexOf('.') + 1;

                assert.equal(decoratorInfos[0].parameters[0].type.details[0].text.substr(lastIndexOf), 'Sample');
                */
            }
        });
    });
});
