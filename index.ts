import { Project, SyntaxKind, ClassDeclaration } from 'ts-morph';
import { ClassExtractor } from './extractors/class/ClassExtractor';

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
export * from './extractors/common/TypeDetailInfo';
export * from './extractors/common/TypeExtractor';
export * from './extractors/common/TypeInfo';
export * from './extractors/constructor/ConstructorExtractor';
export * from './extractors/constructor/ConstructorInfo';
export * from './extractors/constructor/ConstructorParameterInfo';
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
export * from './markdown/Const';
export * from './markdown/class/ClassToMdConverter';
export * from './markdown/comment/CommentTagNameReplacer';
export * from './markdown/comment/CommentToMdConverter';
export * from './markdown/comment/CommentToMdOption';
export * from './markdown/module/ModuleToMdConverter';
export * from './utilities/JsonUtils';
export * from './utilities/StringUtils';
export * from './utilities/FsUtils';
export * from './utilities/AureliaSourceFile';
export * from './utilities/AureliaSourceFileUtils';
export * from './utilities/PrettifierUtils';

/*
import { AureliaSourceFileUtils } from './utilities/AureliaSourceFileUtils';

let files = new AureliaSourceFileUtils();
let result = files.getSourceFiles('...');
if (result)
    files.save(result);
*/

const sampleText = `export class Sample { }`;
const decoratorText = `
export function inject(value: any) {
    return function (target: any) {
    }
}`;
const programText = `
import {Sample} from './sample';
import {inject} from './decorator';
@inject( Sample )
export class Program { }
`;


const project = new Project();
const sampleFile = project.createSourceFile('sample.ts', sampleText);
const decoratorFile = project.createSourceFile('decorator.ts', decoratorText);
const programFile = project.createSourceFile('program.ts', programText);

programFile.forEachDescendant(x => {
    switch (x.getKind()) {
        case SyntaxKind.ClassDeclaration:
            let info = new ClassExtractor().extract((x as ClassDeclaration));
            break;
    }
});
