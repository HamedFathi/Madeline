import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { FunctionInfo } from '../../../../extractors/function/FunctionInfo';
import { FunctionTemplateInfo } from './FunctionTemplateInfo';
import { prettify } from '../../../../utilities/PrettierUtils';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { FUNCTION_TEMPLATE } from './FunctionTemplate';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { FunctionParameterTemplateInfo } from './FunctionParameterTemplateInfo';

export class FunctionToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
    ) {}
    public convert(
        functionInfo: FunctionInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (functionInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(functionInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (functionInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(functionInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const typeParameters = functionInfo.typeParameters
            ? functionInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert(functionInfo.id, x, source, map, baseUrl),
              )
            : undefined;
        const parameters: FunctionParameterTemplateInfo[] = [];

        if (functionInfo.parameters) {
            for (const param of functionInfo.parameters) {
                parameters.push({
                    text: param.text,
                    initializer: param.initializer,
                    isOptional: param.isOptional,
                    isParameterProperty: param.isParameterProperty,
                    name: param.name,
                    isRest: param.isRest,
                    modifiers: param.modifiers,
                    type: this.typeToMdConverter.convert(functionInfo.id, param.type, source, map, baseUrl),
                });
            }
        }
        const obj: FunctionTemplateInfo = {            
            name: functionInfo.name,
            text: prettify(functionInfo.text),
            description: description.length === 0 ? void 0 : description,
            isGenerator: functionInfo.isGenerator,
            isImplementation: functionInfo.isImplementation,
            isOverload: functionInfo.isOverload,
            modifiers: functionInfo.modifiers,
            typeGuard:functionInfo.typeGuard,
            modules: functionInfo.modules
                ? this.moduleToMdConverter.convert(functionInfo.modules, commentOptions)
                : undefined,
            returnType: functionInfo.returnType
                ? this.typeToMdConverter.convert(functionInfo.id, functionInfo.returnType, source, map, baseUrl)
                : undefined,
            typeParameters: typeParameters,
            parameters: parameters.length === 0 ? undefined : parameters,
        };
        const text = Nunjucks.renderString(FUNCTION_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
