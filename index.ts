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
export * from './extractors/source-file/MergedSourceFileInfo';
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
export * from './templates/api/class/ClassToMdConverter';
export * from './templates/api/comment/AlternativeTagOptions';
export * from './templates/api/comment/CommentGroup';
export * from './templates/api/comment/CommentGroupInfo';
export * from './templates/api/comment/CommentTemplate';
export * from './templates/api/comment/CommentTemplateInfo';
export * from './templates/api/comment/CommentToMdConverter';
export * from './templates/api/comment/CommentToMdOption';
export * from './templates/api/comment/TagInfoHeader';
export * from './templates/api/module/ModuleTemplate';
export * from './templates/api/module/ModuleTemplateInfo';
export * from './templates/api/module/ModuleToMdConverter';
export * from './templates/api/type-alias/TypeAliasTemplate';
export * from './templates/api/type-alias/TypeAliasTemplateInfo';
export * from './templates/api/type-alias/TypeAliasToMdConverter';
export * from './templates/api/type-parameter/TypeParameterTemplate';
export * from './templates/api/type-parameter/TypeParameterTemplateInfo';
export * from './templates/api/type-parameter/TypeParameterToMdConverter';
export * from './templates/api/type/TypeToMdConverter';
export * from './templates/git-book/summary/ClassSummaryMaker';
export * from './templates/git-book/summary/DestructuringSummaryMaker';
export * from './templates/git-book/summary/EnumSummaryMaker';
export * from './templates/git-book/summary/ExportAssignmentSummaryMaker';
export * from './templates/git-book/summary/FunctionSummaryMaker';
export * from './templates/git-book/summary/InterfaceSummaryMaker';
export * from './templates/git-book/summary/LiteralSummaryMaker';
export * from './templates/git-book/summary/SummaryCategory';
export * from './templates/git-book/summary/SummaryDetailInfo';
export * from './templates/git-book/summary/SummaryMaker';
export * from './templates/git-book/summary/SummaryRouter';
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

const Stopwatch = require('statman-stopwatch');
import { AureliaSourceFileUtils } from './utilities/AureliaSourceFileUtils';
import { Project } from 'ts-morph';
import { SourceFileExtractor } from './extractors/source-file/SourceFileExtractor';
import { SummaryMaker } from './templates/git-book/summary/SummaryMaker';
import { summaryRouter } from './templates/git-book/summary/SummaryRouter';
const tsconfig = 'E:/@All/Projects/@Git/aurelia/packages/tsconfig-build.json';
const sw = new Stopwatch(true);
// new AureliaSourceFileUtils().saveMerged(tsconfig);
const project = new Project({
    tsConfigFilePath: tsconfig,
});
const sources = project
    .getSourceFiles()
    .filter(x => x.getFilePath().includes('src'))
    .filter(x => !x.getFilePath().includes('__tests__'))
    .filter(x => !x.getFilePath().includes('node_modules'))
    .filter(x => !x.getFilePath().includes('dist'))
    .filter(x => !x.getFilePath().includes('examples'))
    .filter(x => !x.getFilePath().includes('e2e'));
const src = new SourceFileExtractor().fetchAllExported(sources);
if (src) {
    const sum = new SummaryMaker().make(src, '');
}
sw.stop();
const delta = ((sw.read() as number) / 1000).toString();
console.log(parseFloat(delta).toFixed(2) + 's');
const a = 1;
