export * from './extractors/class/ClassExtractor';
export * from './extractors/class/ClassInfo';
export * from './extractors/comment/CommentInfo';
export * from './extractors/comment/CommentKind';
export * from './extractors/comment/HtmlCommentExtractor';
export * from './extractors/comment/JsDocExtractor';
export * from './extractors/comment/TagInfo';
export * from './extractors/comment/TypescriptCommentExtractor';
export * from './extractors/common/CallSignatureInfo';
export * from './extractors/common/CallSignatureParameterInfo';
export * from './extractors/common/CallSignatureParameterTypeInfo';
export * from './extractors/common/CallSignatureTypeInfo';
export * from './extractors/common/FromTypeInfo';
export * from './extractors/common/TypeCategory';
export * from './extractors/common/TypeExtractor';
export * from './extractors/common/TypeInfo';
export * from './extractors/constructor/ConstructorExtractor';
export * from './extractors/constructor/ConstructorInfo';
export * from './extractors/constructor/ConstructorParameterInfo';
export * from './extractors/decorator/DecoratableType';
export * from './extractors/decorator/DecoratorExtractor';
export * from './extractors/decorator/DecoratorInfo';
export * from './extractors/decorator/DecoratorParameterInfo';
export * from './extractors/destructuring/DestructuringElementInfo';
export * from './extractors/destructuring/DestructuringExtractor';
export * from './extractors/destructuring/DestructuringInfo';
export * from './extractors/doc-coverage/CoverageCalculator';
export * from './extractors/doc-coverage/CoverageCalculatorInfo';
export * from './extractors/doc-coverage/CoverageExtractor';
export * from './extractors/doc-coverage/CoverageExtractorInfo';
export * from './extractors/doc-coverage/CoverageExtractorOptions';
export * from './extractors/doc-coverage/CoverageResult';
export * from './extractors/enum/EnumExtractor';
export * from './extractors/enum/EnumInfo';
export * from './extractors/enum/EnumMember';
export * from './extractors/export-assignment/ExportAssignmentExtractor';
export * from './extractors/export-assignment/ExportAssignmentInfo';
export * from './extractors/export/ExportExtractor';
export * from './extractors/export/ExportInfo';
export * from './extractors/export/NamedExportInfo';
export * from './extractors/function/FunctionExtractor';
export * from './extractors/function/FunctionInfo';
export * from './extractors/function/FunctionParameterInfo';
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
export * from './extractors/interface/InterfaceParameterInfo';
export * from './extractors/interface/InterfacePropertyInfo';
export * from './extractors/literal/LiteralAssignmentInfo';
export * from './extractors/literal/LiteralExpressionInfo';
export * from './extractors/literal/LiteralExtractor';
export * from './extractors/literal/LiteralInfo';
export * from './extractors/method/MethodExtractor';
export * from './extractors/method/MethodInfo';
export * from './extractors/method/MethodParameterInfo';
export * from './extractors/module/ModuleExtractor';
export * from './extractors/module/ModuleInfo';
export * from './extractors/property/PropertyExtractor';
export * from './extractors/property/PropertyInfo';
export * from './extractors/set-accessor/SetAccessorExtractor';
export * from './extractors/set-accessor/SetAccessorInfo';
export * from './extractors/set-accessor/SetAccessorParameterInfo';
export * from './extractors/source-file/ExportedSourceFileInfo';
export * from './extractors/source-file/SourceFileClassInfo';
export * from './extractors/source-file/SourceFileCoverageInfo';
export * from './extractors/source-file/SourceFileExtractor';
export * from './extractors/source-file/SourceFileInfo';
export * from './extractors/type-alias/TypeAliasExtractor';
export * from './extractors/type-alias/TypeAliasInfo';
export * from './extractors/type-parameter/TypeParameterExtractor';
export * from './extractors/type-parameter/TypeParameterInfo';
export * from './extractors/variable/VariableExtractor';
export * from './extractors/variable/VariableInfo';
export * from './templates/git-book/markdown/class/ClassToMdConverter';
export * from './templates/git-book/markdown/comment/AlternativeTagOptions';
export * from './templates/git-book/markdown/comment/CommentGroup';
export * from './templates/git-book/markdown/comment/CommentGroupInfo';
export * from './templates/git-book/markdown/comment/CommentTemplate';
export * from './templates/git-book/markdown/comment/CommentTemplateInfo';
export * from './templates/git-book/markdown/comment/CommentToMdConverter';
export * from './templates/git-book/markdown/comment/CommentToMdOption';
export * from './templates/git-book/markdown/comment/TagInfoHeader';
export * from './templates/git-book/markdown/decorator/DecoratorParameterTemplateInfo';
export * from './templates/git-book/markdown/decorator/DecoratorTemplate';
export * from './templates/git-book/markdown/decorator/DecoratorTemplateInfo';
export * from './templates/git-book/markdown/decorator/DecoratorToMdConverter';
export * from './templates/git-book/markdown/destructuring/DestructuringTemplate';
export * from './templates/git-book/markdown/destructuring/DestructuringTemplateInfo';
export * from './templates/git-book/markdown/destructuring/DestructuringToMdConverter';
export * from './templates/git-book/markdown/enum/EnumMemberTemplateInfo';
export * from './templates/git-book/markdown/enum/EnumTemplate';
export * from './templates/git-book/markdown/enum/EnumTemplateInfo';
export * from './templates/git-book/markdown/enum/EnumToMdConverter';
export * from './templates/git-book/markdown/module/ModuleTemplate';
export * from './templates/git-book/markdown/module/ModuleTemplateInfo';
export * from './templates/git-book/markdown/module/ModuleToMdConverter';
export * from './templates/git-book/markdown/type-alias/TypeAliasTemplate';
export * from './templates/git-book/markdown/type-alias/TypeAliasTemplateInfo';
export * from './templates/git-book/markdown/type-alias/TypeAliasToMdConverter';
export * from './templates/git-book/markdown/type-parameter/TypeParameterTemplate';
export * from './templates/git-book/markdown/type-parameter/TypeParameterTemplateInfo';
export * from './templates/git-book/markdown/type-parameter/TypeParameterToMdConverter';
export * from './templates/git-book/markdown/type/TypeCategoryFinder';
export * from './templates/git-book/markdown/type/TypeDetailTemplateInfo';
export * from './templates/git-book/markdown/type/TypeMapInfo';
export * from './templates/git-book/markdown/type/TypeMapper';
export * from './templates/git-book/markdown/type/TypeTemplate';
export * from './templates/git-book/markdown/type/TypeTemplateInfo';
export * from './templates/git-book/markdown/type/TypeToMdConverter';
export * from './templates/git-book/summary/ClassSummaryMaker';
export * from './templates/git-book/summary/DestructuringSummaryMaker';
export * from './templates/git-book/summary/EnumSummaryMaker';
export * from './templates/git-book/summary/ExportAssignmentSummaryMaker';
export * from './templates/git-book/summary/FunctionSummaryMaker';
export * from './templates/git-book/summary/InterfaceSummaryMaker';
export * from './templates/git-book/summary/LiteralSummaryMaker';
export * from './templates/git-book/summary/SummaryInfo';
export * from './templates/git-book/summary/SummaryMaker';
export * from './templates/git-book/summary/SummaryMapInfo';
export * from './templates/git-book/summary/SummaryMapper';
export * from './templates/git-book/summary/TypeAliasSummaryMaker';
export * from './templates/git-book/summary/VariableSummaryMaker';
export * from './templates/TemplateOptions';
export * from './utilities/AureliaSourceFileUtils';
export * from './utilities/FsUtils';
export * from './utilities/HashUtils';
export * from './utilities/JsonUtils';
export * from './utilities/MarkdownUtils';
export * from './utilities/NunjucksUtils';
export * from './utilities/ObjectUtils';
export * from './utilities/PathInfo';
export * from './utilities/PathUtils';
export * from './utilities/PrettierUtils';
export * from './utilities/StringUtils';

/*
import { DecoratorExtractor } from './extractors/decorator/DecoratorExtractor';
import { DecoratorToMdConverter } from './templates/git-book/markdown/decorator/DecoratorToMdConverter';
const Stopwatch = require('statman-stopwatch');
import { AureliaSourceFileUtils } from './utilities/AureliaSourceFileUtils';
import { Project, ClassDeclaration, SyntaxKind, ScriptTarget } from 'ts-morph';
import { SourceFileExtractor } from './extractors/source-file/SourceFileExtractor';
import { SummaryMaker } from './templates/git-book/summary/SummaryMaker';
import * as fse from 'fs-extra';
import { summaryMapper } from './templates/git-book/summary/SummaryMapper';
import { TypeToMdConverter } from './templates/git-book/markdown/type/TypeToMdConverter';
import { typeMapper } from './templates/git-book/markdown/type/TypeMapper';
import { TypeAliasToMdConverter } from './templates/git-book/markdown/type-alias/TypeAliasToMdConverter';
import { EnumToMdConverter } from './templates/git-book/markdown/enum/EnumToMdConverter';
const tsconfig = 'E:/@All/Projects/@Git/aurelia/packages/tsconfig-build.json';
const sw = new Stopwatch(true);
const src = new AureliaSourceFileUtils().saveMerged(tsconfig);
const project = new Project({
    tsConfigFilePath: tsconfig,
});
if (src) {
    const sum = new SummaryMaker().make(src, summaryMapper);
    const md = new SummaryMaker().write(sum);
    fse.outputFileSync('packages/SUMMARY.md', md);
    if (src.typeAliases) {
        src.typeAliases.forEach(s => {
            const x = new TypeAliasToMdConverter().convert(s, src, typeMapper, 'https://gitbook-18.gitbook.io/au');
            const a = 1;
        });
    }
    if (src.enums) {
        src.enums.forEach(s => {
            const x = new EnumToMdConverter().convert(s);
            const a = 1;
        });
    }
}
sw.stop();
const delta = ((sw.read() as number) / 1000).toString();
console.log(parseFloat(delta).toFixed(2) + 's');
const a = 1;

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

const project1 = new Project({
    compilerOptions: {
        target: ScriptTarget.ES5,
    },
});
const file = project1.createSourceFile('test.ts', decoratorSample);
file.forEachDescendant(x => {
    switch (x.getKind()) {
        case SyntaxKind.ClassDeclaration:
            const dec = new DecoratorExtractor();
            const decorator = dec.extract(x as ClassDeclaration, undefined);
            if (decorator) {
                const y = new DecoratorToMdConverter().convert(decorator, src, typeMapper);
                const yy = 1;
            }
            const a = 1;
            break;
    }
});
*/
