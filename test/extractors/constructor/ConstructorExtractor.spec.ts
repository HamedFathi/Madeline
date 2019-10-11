import { assert } from 'chai';
import { Project, ScriptTarget, SyntaxKind, CommentRange, ConstructorDeclaration } from 'ts-morph';
import { ConstructorExtractor } from '../../../extractors/constructor/ConstructorExtractor';
import { TypescriptCommentExtractor } from '../../../extractors/comment/TypescriptCommentExtractor';
import { CommentInfo } from '../../../extractors/comment/CommentInfo';
import { CommentKind } from '../../../extractors/comment/CommentKind';
import { JsDocExtractor } from '../../../extractors/comment/JsDocExtractor';
import { ConstructorInfo } from '../../../extractors/constructor/ConstructorInfo';

describe('Constructor Extractor', () => {
    let project: Project;
    let extractor: ConstructorExtractor;

    const mockCommentInfo: CommentInfo[] = [
        {
            text: 'comment1',
            kind: CommentKind.JsSingleLine,
            kindName: 'SingleLine',
            description: ['Comment1 description'],
            tags: undefined,
        },
        {
            text: 'comment1',
            kind: CommentKind.JsMultiLine,
            kindName: 'MultiLine',
            description: ['Comment1 description'],
            tags: undefined,
        },
    ];
    const mockJsDocExtractor: JsDocExtractor = {
        /* eslint-disable */
        extract: function (data: string, kind: CommentKind): CommentInfo {
            /* eslint-disable */
            return mockCommentInfo[0];
        },
    };

    class MockTypeScriptCommentExtractor extends TypescriptCommentExtractor {
        constructor() {
            super(mockJsDocExtractor);
        }
        public extract(commentRanges: CommentRange[]): CommentInfo[] {
            return mockCommentInfo;
        }
    }

    let mockTypeScriptCommentExtractor = new MockTypeScriptCommentExtractor();

    beforeEach(() => {
        project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        extractor = new ConstructorExtractor(mockTypeScriptCommentExtractor);
    });

    it('should return a parameter-less constructor with no modifier and isImplementation equals true', () => {
        const sut = `export class B {
            constructor() { }
        }`;

        const file = project.createSourceFile('sample.ts', sut);

        file.forEachDescendant(node => {
            if (node.getKind() === SyntaxKind.Constructor) {
                const result = extractor.extract(node as ConstructorDeclaration, []);

                assert.isTrue(result !== void 0);
                assert.equal(result.text, "constructor() { }");
                assert.isTrue(result.isImplementation);
                assert.isTrue(result.isParameterLess && result.parameters === void 0);
                assert.isFalse(result.isOverload);
                assert.isTrue(result.modifiers === void 0);
            }
        });
    });

    it('should return the exact info from comment extractor', () => {
        const sut = `export class B {
            constructor() { }
        }`;

        const file = project.createSourceFile('sample.ts', sut);

        file.forEachDescendant(node => {
            if (node.getKind() === SyntaxKind.Constructor) {
                const result = extractor.extract(node as ConstructorDeclaration, []);

                assert.isTrue(result !== void 0);
                assert.isTrue(result.hasComment);
                assert.deepEqual(result.leadingComments, mockCommentInfo);
                assert.deepEqual(result.trailingComments, mockCommentInfo);
            }
        });
    });

    it('should return two constructors, one implemented and one overloaded', () => {

        const sut = `export class G {
            constructor();
            constructor(age: number){};
        }`;

        const file = project.createSourceFile('sample.ts', sut);

        const result: ConstructorInfo[] = [];
        file.forEachDescendant(node => {
            if (node.getKind() === SyntaxKind.Constructor) {
                result.push(extractor.extract(node as ConstructorDeclaration, []));
            }
        });

        assert.equal(result.length, 2);

        assert.isTrue(result[0].isOverload);
        assert.isTrue(result[0].isParameterLess);

        assert.isFalse(result[1].isParameterLess);
        assert.isTrue(result[1].isImplementation);
    });

    it('should list arguments of the implemented constructor', () => {

        const sut = `export class G {
            constructor();
            constructor(age: number){};
        }`;

        const file = project.createSourceFile('sample.ts', sut);

        const result: ConstructorInfo[] = [];
        file.forEachDescendant(node => {
            if (node.getKind() === SyntaxKind.Constructor) {
                result.push(extractor.extract(node as ConstructorDeclaration, []));
            }
        });

        assert.equal(result.length, 2);

        assert.isFalse(result[1].isParameterLess);
        assert.isTrue(result[1].isImplementation);

        assert.equal(result[1].parameters.length , 1);
    });

    it('should list arguments of the overloaded constructor as zero', () => {

        const sut = `export class G {
            constructor();
            constructor(age: number){};
        }`;

        const file = project.createSourceFile('sample.ts', sut);

        const result: ConstructorInfo[] = [];
        file.forEachDescendant(node => {
            if (node.getKind() === SyntaxKind.Constructor) {
                result.push(extractor.extract(node as ConstructorDeclaration, []));
            }
        });

        assert.equal(result.length, 2);

        assert.isTrue(result[0].isParameterLess);
        assert.isFalse(result[0].isImplementation);

        assert.equal(result[0].parameters, void 0 );
    });


});

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


// describe('Constructor Extractor', function () {
//     it('should return correct ConstructorInfo', function () {
//         const project = new Project({
//             compilerOptions: {
//                 target: ScriptTarget.ES5
//             }
//         });
//         let actualResult: Array<any> = [];
//         let expectedResult: Array<any> = [];
//         // Class A
//         let expectedResult1: any = [{
//             "trailingComments": undefined,
//             "leadingComments": undefined,
//             "modifiers": undefined,
//             "variables": undefined,
//             "isParameterLess": false,
//             "isImplementation": true,
//             "isOverload": false,
//             "expressions": [
//                 {
//                     "leadingComments": undefined,
//                     "modules": undefined,
//                     "text": "super();",
//                     "trailingComments": undefined
//                 }
//             ],
//             "parameters": [{
//                 "name": "ic",
//                 "type": {
//                     "kind": 8,
//                     "kindName": "Interface",
//                     "type": "IC"
//                 },
//                 "modifiers": undefined,
//                 "isOptional": false,
//                 "isRest": false,
//                 "isParameterProperty": false,
//                 "initializer": undefined,
//                 "decorators": undefined
//             }, {
//                 "name": "id",
//                 "type": {
//                     "kind": 8,
//                     "kindName": "Interface",
//                     "type": "ID"
//                 },
//                 "modifiers": undefined,
//                 "isOptional": false,
//                 "isRest": false,
//                 "isParameterProperty": false,
//                 "initializer": undefined,
//                 "decorators": undefined
//             }, {
//                 "name": "ie",
//                 "type": {
//                     "kind": 8,
//                     "kindName": "Interface",
//                     "type": "IE"
//                 },
//                 "modifiers": undefined,
//                 "isOptional": true,
//                 "isRest": false,
//                 "isParameterProperty": false,
//                 "initializer": undefined,
//                 "decorators": undefined
//             }]
//         }];
//         // Class B - it has a parameter-less constructor so returns [[]].
//         let expectedResult2: any = [{
//             "trailingComments": undefined,
//             "leadingComments": undefined,
//             "modifiers": undefined,
//             "isParameterLess": true,
//             "expressions": undefined,
//             "variables": undefined,
//             "isImplementation": true,
//             "isOverload": false,
//             "parameters": undefined
//         }];
//         // Class G - multiple constructors - Type 1
//         let expectedResult3: any = [{
//             "trailingComments": undefined,
//             "leadingComments": undefined,
//             "modifiers": undefined,
//             "isParameterLess": false,
//             "expressions": undefined,
//             "isImplementation": true,
//             "variables": undefined,
//             "isOverload": false,
//             "parameters": [{
//                 "name": "obj",
//                 "type": {
//                     "kind": 1,
//                     "kindName": "Any",
//                     "type": "any"
//                 },
//                 "modifiers": undefined,
//                 "isOptional": true,
//                 "isRest": false,
//                 "isParameterProperty": false,
//                 "initializer": undefined,
//                 "decorators": undefined
//             }]
//         }];
//         // Class H - multiple constructors - Type 2
//         let expectedResult4: any = [{
//             "trailingComments": undefined,
//             "leadingComments": undefined,
//             "variables": undefined,
//             "modifiers": undefined,
//             "expressions": undefined,
//             "isParameterLess": true,
//             "isImplementation": true,
//             "isOverload": false,
//             "parameters": undefined
//         }, {
//             "trailingComments": undefined,
//             "leadingComments": undefined,
//             "modifiers": undefined,
//             "variables": undefined,
//             "isParameterLess": false,
//             "isImplementation": true,
//             "expressions": undefined,
//             "isOverload": false,
//             "parameters": [{
//                 "name": "value",
//                 "type": {
//                     "kind": 8,
//                     "kindName": "Interface",
//                     "type": "ID"
//                 },
//                 "modifiers": ["private"],
//                 "isOptional": true,
//                 "isRest": false,
//                 "isParameterProperty": true,
//                 "initializer": undefined,
//                 "decorators": undefined
//             }
//             ]
//         }, {
//             "trailingComments": undefined,
//             "leadingComments": undefined,
//             "modifiers": undefined,
//             "variables": undefined,
//             "isParameterLess": false,
//             "isImplementation": true,
//             "isOverload": false,
//             "expressions": undefined,
//             "parameters": [{
//                 "name": "value",
//                 "type": {
//                     "kind": 8,
//                     "kindName": "Interface",
//                     "type": "ID"
//                 },
//                 "modifiers": ["private"],
//                 "isOptional": false,
//                 "isRest": false,
//                 "isParameterProperty": true,
//                 "initializer": undefined,
//                 "decorators": undefined
//             }]
//         }];
//         // Class F - it has not any constructor so returns undefined.
//         let expectedResult5: any = undefined;
//         // Class J - it has a constructor with default value.
//         let expectedResult6: any = [{
//             "trailingComments": undefined,
//             "leadingComments": undefined,
//             "modifiers": undefined,
//             "variables": undefined,
//             "expressions": undefined,
//             "isParameterLess": false,
//             "isImplementation": true,
//             "isOverload": false,
//             "parameters": [{
//                 "name": "bar",
//                 "type": {
//                     "kind": 15,
//                     "kindName": "String",
//                     "type": "string"
//                 },
//                 "modifiers": undefined,
//                 "isOptional": true,
//                 "isRest": false,
//                 "isParameterProperty": false,
//                 "initializer": "\"bar\"",
//                 "decorators": undefined
//             }]
//         }];
//         expectedResult.push(expectedResult1, expectedResult2, expectedResult3, expectedResult4, expectedResult5, expectedResult6);

//         const file = project.createSourceFile("test.ts", ctorSample);
//         file.forEachDescendant(x => {
//             switch (x.getKind()) {
//                 case SyntaxKind.ClassDeclaration:
//                     let ctorVisitor = new ConstructorExtractor();
//                     let ctor = ctorVisitor.extractFromClass(<ClassDeclaration>x);
//                     actualResult.push(ctor);
//                     break;
//             }
//         });
//         assert.deepEqual(actualResult, expectedResult);
//     });
// });
