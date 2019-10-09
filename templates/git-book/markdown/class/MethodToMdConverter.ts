import { TypeMapInfo } from './../type/TypeMapInfo';
import { ExportedSourceFileInfo } from './../../../../extractors/source-file/ExportedSourceFileInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { MethodInfo } from '../../../../extractors/method/MethodInfo';
import { DecoratorToMdConverter } from '../decorator/DecoratorToMdConverter';
import { MethodTemplateInfo } from './MethodTemplateInfo';
import { METHOD_TEMPLATE } from './MethodTemplate';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { MethodParameterTemplateInfo } from './MethodParameterTemplateInfo';

export class MethodToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private decoratorToMdConverter = new DecoratorToMdConverter(),
    ) {}
    public convert(
        methodInfo: MethodInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (methodInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(methodInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (methodInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(methodInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const decorators: string | undefined = methodInfo.decorators
            ? this.decoratorToMdConverter.convert(methodInfo.decorators, source, map, baseUrl)
            : undefined;
        const typeParameters = methodInfo.typeParameters
            ? methodInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert(methodInfo.id, x, source, map, baseUrl),
              )
            : undefined;

        const methodParameters: MethodParameterTemplateInfo[] = [];
        if (methodInfo.parameters) {
            methodInfo.parameters.forEach(param => {
                const decorators: string | undefined = param.decorators
                    ? this.decoratorToMdConverter.convert(param.decorators, source, map, baseUrl)
                    : undefined;
                const parameter: MethodParameterTemplateInfo = {
                    decorators: decorators,
                    initializer: param.initializer,
                    isOptional: param.isOptional,
                    isParameterProperty: param.isParameterProperty,
                    isRest: param.isRest,
                    name: param.name,
                    modifiers: param.modifiers,
                    text: param.text,
                    type: this.typeToMdConverter.convert(methodInfo.id, param.type, source, map, baseUrl),
                };
                methodParameters.push(parameter);
            });
        }
        const obj: MethodTemplateInfo = {
            name: methodInfo.name,
            description: description.length === 0 ? void 0 : description,
            decorators: decorators,
            isGenerator: methodInfo.isGenerator,
            typeParameters: typeParameters,
            parameters: methodParameters.length === 0 ? void 0 : methodParameters,
            modifiers: methodInfo.modifiers,
            returnType: this.typeToMdConverter.convert(methodInfo.id, methodInfo.returnType, source, map, baseUrl),
            text: methodInfo.text,
        };
        const text = Nunjucks.renderString(METHOD_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        methodsInfo: MethodInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        methodsInfo.forEach(methodInfo => {
            const text = Nunjucks.renderString(METHOD_TEMPLATE, methodInfo);
            const md = this.markdownUtils.purify(text);
            result.push(md);
        });
        return result.length === 0 ? void 0 : result;
    }
}
