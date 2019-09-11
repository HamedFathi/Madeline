import { ScriptTarget, Project, SyntaxKind, ClassDeclaration } from 'ts-morph';
import { ClassExtractor } from './extractors/class/ClassExtractor';
import { PrettierUtils } from './utilities/PrettifierUtils';
import { ModuleToMdConverter } from './markdown/module/ModuleToMdConverter';
import { ClassToMdConverter } from './markdown/class/ClassToMdConverter';
import { CommentToMdConverter } from './markdown/comment/CommentToMdConverter';

export * from './extractors/class/ClassExtractor';
export * from './extractors/class/ClassInfo';
export * from './extractors/comment/CommentInfo';
export * from './extractors/comment/CommentKind';
export * from './extractors/comment/HtmlCommentExtractor';
export * from './extractors/comment/JsDocExtractor';
export * from './extractors/comment/TagInfo';
export * from './extractors/comment/TypescriptCommentExtractor';
export * from './extractors/common/CallSignatureInfo';
export * from './extractors/common/CallSignatureParamInfo';
export * from './extractors/common/CallSignatureParamTypeInfo';
export * from './extractors/common/CallSignatureTypeInfo';
export * from './extractors/common/ImportInType';
export * from './extractors/common/JsonLikeTypeInfo';
export * from './extractors/common/TypeExtractor';
export * from './extractors/common/TypeInfo';
export * from './extractors/common/TypeKind';
export * from './extractors/constructor/ConstructorExtractor';
export * from './extractors/constructor/ConstructorInfo';
export * from './extractors/constructor/ConstructorParamInfo';
export * from './extractors/decorator/DecoratorExtractor';
export * from './extractors/decorator/DecoratorInfo';
export * from './extractors/destructuring/DestructuringElementInfo';
export * from './extractors/destructuring/DestructuringExtractor';
export * from './extractors/destructuring/DestructuringInfo';
export * from './extractors/doc-coverage/CoverageCalculator';
export * from './extractors/doc-coverage/CoverageCalculatorInfo';
export * from './extractors/doc-coverage/CoverageExtractor';
export * from './extractors/doc-coverage/CoverageExtractorInfo';
export * from './extractors/doc-coverage/CoverageExtractorOption';
export * from './extractors/doc-coverage/CoverageResult';
export * from './extractors/enum/EnumExtractor';
export * from './extractors/enum/EnumInfo';
export * from './extractors/enum/EnumMember';
export * from './extractors/export/ExportExtractor';
export * from './extractors/export/ExportInfo';
export * from './extractors/export/NamedExportInfo';
export * from './extractors/export-assignment/ExportAssignmentExtractor';
export * from './extractors/export-assignment/ExportAssignmentInfo';
export * from './extractors/function/FunctionExtractor';
export * from './extractors/function/FunctionInfo';
export * from './extractors/function/FunctionParamInfo';
export * from './extractors/get-accessor/GetAccessorExtractor';
export * from './extractors/get-accessor/GetAccessorInfo';
export * from './extractors/import/ImportExtractor';
export * from './extractors/import/ImportInfo';
export * from './extractors/import/ImportKind';
export * from './extractors/interface/InterfaceCallSignatureInfo';
export * from './extractors/interface/InterfaceConstructorInfo';
export * from './extractors/interface/InterfaceExtendsInfo';
export * from './extractors/interface/InterfaceExtractor';
export * from './extractors/interface/InterfaceIndexerInfo';
export * from './extractors/interface/InterfaceInfo';
export * from './extractors/interface/InterfaceMethodInfo';
export * from './extractors/interface/InterfaceParamInfo';
export * from './extractors/interface/InterfacePropertyInfo';
export * from './extractors/literal/LiteralAssignmentInfo';
export * from './extractors/literal/LiteralExpressionInfo';
export * from './extractors/literal/LiteralExtractor';
export * from './extractors/literal/LiteralInfo';
export * from './extractors/method/MethodExtractor';
export * from './extractors/method/MethodInfo';
export * from './extractors/method/MethodParamInfo';
export * from './extractors/module/ModuleExtractor';
export * from './extractors/module/ModuleInfo';
export * from './extractors/property/PropertyExtractor';
export * from './extractors/property/PropertyInfo';
export * from './extractors/set-accessor/SetAccessorExtractor';
export * from './extractors/set-accessor/SetAccessorInfo';
export * from './extractors/set-accessor/SetAccessorParamInfo';
export * from './extractors/source-file/SourceFileClassInfo';
export * from './extractors/source-file/SourceFileCoverageInfo';
export * from './extractors/source-file/SourceFileExtractor';
export * from './extractors/source-file/SourceFileInfo';
export * from './extractors/type-alias/TypeAliasExtractor';
export * from './extractors/type-alias/TypeAliasInfo';
export * from './extractors/type-parameter/TypeParameterExtractor';
export * from './extractors/type-parameter/TypeParameterInfo';
export * from './extractors/variable/CommonVariableInfo';
export * from './extractors/variable/VariableExtractor';
export * from './extractors/variable/VariableInfo';
export * from './utilities/JsonUtils';
export * from './utilities/StringUtils';
export * from './utilities/FsUtils';
export * from './utilities/AureliaSourceFile';
export * from './utilities/AureliaSourceFileUtils';

/*
import { AureliaSourceFileUtils } from './utilities/AureliaSourceFileUtils';

let files = new AureliaSourceFileUtils();
let result = files.getSourceFiles('...');
if (result)
    files.save(result);
*/

const classSample = `
class Greeter {    greeting: string;    constructor(message: string) {
        this.greeting = message;    }    greet() {        return "Hello, " + this.greeting;
    }}let greeter = new Greeter("world");
`;

const htmlSample = `
<!DOCTYPE html><html><head><title>Page Title</title></head><body><h1>This is a Heading</h1><p>This is a paragraph.</p></body></html>
`;

const docSample = `
/**
* This is a class.
* Just for test!
*
* @class Statistics - A class with ctor and a method.
*/
export class Statistics {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    // Just says hello :)
    greet() {
        return "Hello, " + this.greeting;
    }
    /**
     * Returns the average of two numbers.
     *
     * @remarks
     * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param x - The first input number
     * @param y - The second input number
     * @returns The arithmetic mean of \`x\` and \`y\`
     *
     * @beta
     */
    public static getAverage(x: number, y: number): number {
        return (x + y) / 2.0;
    }
}
`;
const moduleSample = `
module NS1 {
	export namespace NS2 {
		module NS3 {
            // aaaaa
			namespace NS4 {
				class Greeter {
					greeting: string;
					constructor(message: string) {
						this.greeting = message;
					}
				}
			}
		}
	}
}
`;

const project = new Project({
    compilerOptions: {
        target: ScriptTarget.ES5,
    },
});
const file = project.createSourceFile('test.ts', moduleSample);

file.forEachDescendant(x => {
    switch (x.getKind()) {
        case SyntaxKind.ClassDeclaration:
            const clsVisitor = new ClassExtractor();
            const cls = clsVisitor.extract(x as ClassDeclaration);
            if (cls.modules) {
                const aaa = new ModuleToMdConverter().convert(cls.modules);
                aaa.forEach(aa => {
                    console.log(aa);
                });
            }
            const src = new PrettierUtils().prettify(cls.text);
            const src2 = new PrettierUtils().prettify(htmlSample, 'html');
            if (cls.leadingComments) {
                const src3 = new CommentToMdConverter().convert(cls.leadingComments, true);
                console.log(src3);
                const a = 2;
            }
            const md = new ClassToMdConverter().convert(cls);
            console.log(md);
            break;
    }
});
