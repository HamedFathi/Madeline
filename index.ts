import { Project, ScriptTarget } from 'ts-morph';
import { SourceFileExtractor } from './extractors/source-file/SourceFileExtractor';

export * from './extractors/class/ClassExtractor';
export * from './extractors/class/ClassInfo';
export * from './extractors/comment/CommentInfo';
export * from './extractors/comment/CommentKind';
export * from './extractors/comment/HtmlCommentExtractor';
export * from './extractors/comment/JsDocExtractor';
export * from './extractors/comment/TagInfo';
export * from './extractors/comment/TypescriptCommentExtractor';
export * from './extractors/common/CallSignatureParamTypeInfo';
export * from './extractors/common/CallSignatureTypeInfo';
export * from './extractors/common/JsonTypeInfo';
export * from './extractors/common/TypeExtractor';
export * from './extractors/common/TypeInfo';
export * from './extractors/common/TypeKind';
export * from './extractors/common/TypeParameterInfo';
export * from './extractors/constructor/ConstructorExtractor';
export * from './extractors/constructor/ConstructorInfo';
export * from './extractors/constructor/ConstructorParamInfo';
export * from './extractors/decorator/DecoratorExtractor';
export * from './extractors/decorator/DecoratorInfo';
export * from './extractors/doc-coverage/CoverageCalculator';
export * from './extractors/doc-coverage/CoverageCalculatorInfo';
export * from './extractors/doc-coverage/CoverageExtractor';
export * from './extractors/doc-coverage/CoverageExtractorInfo';
export * from './extractors/doc-coverage/CoverageExtractorOption';
export * from './extractors/doc-coverage/CoverageResult';
export * from './extractors/enum/EnumExtractor';
export * from './extractors/enum/EnumInfo';
export * from './extractors/enum/EnumMember';
export * from './extractors/export-assignment/ExportAssignmentExtractor';
export * from './extractors/export-assignment/ExportAssignmentInfo';
export * from './extractors/expression/ExpressionExtractor';
export * from './extractors/expression/ExpressionInfo';
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
export * from './extractors/variable/VariableExtractor';
export * from './extractors/variable/VariableInfo';
export * from './utilities/JsonUtils';
export * from './utilities/StringUtils';




const sample = `
export const DefaultBindingLanguage = [
	DefaultBindingCommandRegistration,
	OneTimeBindingCommandRegistration,
	FromViewBindingCommandRegistration,
	ToViewBindingCommandRegistration,
	TwoWayBindingCommandRegistration,
	CallBindingCommandRegistration,
	ForBindingCommandRegistration
  ];
  
const obj = {
	propertyAssignment2: (s:string, c?:number,f:string='hhh') : boolean => {
		return true;
	},
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
			...DefaultBindingLanguage);
	},
	/**
	 * Create a new container with this configuration applied to it.
	 */
	createContainer(): IContainer {
		return this.register(DI.createContainer());
	}
}; 

let myIdentity: <T>(arg: T) => T = identity;

`;

const project = new Project({
    compilerOptions: {
        target: ScriptTarget.ES5
    }
});
const file = project.createSourceFile("test.ts", sample);
let result = new SourceFileExtractor().extract(file);
const a = 8;