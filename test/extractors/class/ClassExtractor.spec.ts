import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration } from 'ts-morph';
import { ClassExtractor } from '../../../extractors/class/ClassExtractor';
import { ModuleExtractor } from "../../../extractors/module/ModuleExtractor";
import { DecoratorInfo } from "../../../extractors/decorator/DecoratorInfo";
import { DecoratableType } from "../../../extractors/decorator/DecoratableType";

describe('Class Extractor', () => {

    let project: Project;

    beforeEach(() => {
        project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5,
            },
        });
    });

    it('should return undefined if node is not a class declaration', () => {
        const sut = `export class Sample{
            constructor(){}
            get prop() : number{
                return 0;
            }
        }`;

        const classExtractor = new ClassExtractor();

        var file = project.createSourceFile('class.ts', sut);

        file.forEachDescendant(node => {
            if (node.getKind() != SyntaxKind.ClassDeclaration) {
                var classDefinition = classExtractor.extract(node as ClassDeclaration);
                assert.isUndefined(classDefinition);
            }
        });
    })

    it('should return class info from class declaration', () => {

        const sut = `export class Sample{}`;

        const classExtractor = new ClassExtractor();

        var file = project.createSourceFile('class.ts', sut);

        file.forEachDescendant(node => {

            if (node.getKind() == SyntaxKind.ClassDeclaration) {
                var classDefinition = classExtractor.extract(node as ClassDeclaration);
                assert.isTrue(classDefinition !== void 0);
                assert.equal(classDefinition.name, 'Sample');
                assert.deepEqual(classDefinition.modifiers, ['export']);
                assert.equal(classDefinition.text, 'export class Sample{}');
            }
        });

    });

    it('should return decorator info from class declaration', () => {

        const sut = `export class Sample{}`;

        const classExtractor = new ClassExtractor();

        var file = project.createSourceFile('class.ts', sut);

        file.forEachDescendant(node => {

            if (node.getKind() == SyntaxKind.ClassDeclaration) {
                var classDefinition = classExtractor.extract(node as ClassDeclaration);
                assert.isTrue(classDefinition !== void 0);
                assert.equal(classDefinition.name, 'Sample');
                assert.deepEqual(classDefinition.modifiers, ['export']);
                assert.equal(classDefinition.text, 'export class Sample{}');
            }
        });
    });

    it('should return decorator one decorator for the specified class', () => {

        const sut = `@inject()
        export class Sample() {}`;

        const fakeDecorators: DecoratorInfo[] = [{
            name: 'inject',
            parameters: undefined,
            isDecoratorFactory: true,
            text: '@inject()',
        }];

        const fakeDecoratorExtractor = {
            extract: function (
                node: DecoratableType,
                filterStrategy?: (info: DecoratorInfo) => boolean,
            ): DecoratorInfo[] | undefined {
                return fakeDecorators;
            }
        };

        const classExtractor = new ClassExtractor(new ModuleExtractor(), fakeDecoratorExtractor)

        const file = project.createSourceFile('sample.ts' , sut);

        file.forEachDescendant(node =>{
            if( node.getKind() === SyntaxKind.ClassDeclaration ){

                const classDefinition = classExtractor.extract(node as ClassDeclaration);

                assert.isTrue(classDefinition.decorators !== void 0);
                assert.equal(classDefinition.decorators.length , 1);
                assert.deepEqual(classDefinition.decorators, fakeDecorators );

            }
        });

    })

});

// const classSample = `
// // This a test class.
// export default class A {}
// export interface IC {}
// export interface ID {}
// /**
// * This is a test.
// * Class number 2
// *
// * @class B
// * @extends A
// * @implements IC,ID
// */
// export class B extends A implements IC, ID {}
// export namespace NS1 {
// 	module NS2 {
// 		namespace NS3 {
// 			@test({a:1})
// 			class Greeter {
// 				greeting: string;
// 				constructor(message: string) {
// 					this.greeting = message;
// 				}
// 			}
// 		}
// 	}
// }
// `;

// describe('Class Extractor', function () {
//     it('should return correct ClassInfo', function () {
//         const project = new Project({
//             compilerOptions: {
//                 target: ScriptTarget.ES5
//             }
//         });
//         const file = project.createSourceFile("test.ts", classSample);
//         let actualResult: ClassInfo[] = [];
//         let expectedResult: ClassInfo[] = [];
//         file.forEachDescendant(x => {
//             switch (x.getKind()) {
//                 case SyntaxKind.ClassDeclaration:
//                     let clsVisitor = new ClassExtractor();
//                     let cls = clsVisitor.extract(<ClassDeclaration>x);
//                     actualResult.push(cls);
//                     break;
//             }
//         });
//         // console.log(new StringUtils().stringify(actualResult));
//         assert.deepEqual(actualResult, expectedResult);
//     });
// });

