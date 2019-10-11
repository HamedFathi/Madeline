import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { InterfaceMethodInfo } from '../../../../extractors/interface/InterfaceMethodInfo';
import { InterfaceParameterToMdConverter } from './InterfaceParameterToMdConverter';
import { InterfaceMethodTemplateInfo } from './InterfaceMethodTemplateInfo';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { INTERFACE_METHOD_TEMPLATE } from './InterfaceMethodTemplate';

export class InterfaceMethodToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private interfaceParameterToMdConverter = new InterfaceParameterToMdConverter(),
    ) {}
    public convert(
        interfaceMethodInfo: InterfaceMethodInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (interfaceMethodInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(interfaceMethodInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (interfaceMethodInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(interfaceMethodInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const typeParameters = interfaceMethodInfo.typeParameters
            ? interfaceMethodInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert('', x, source, map, baseUrl),
              )
            : undefined;
        const obj: InterfaceMethodTemplateInfo = {
            parameters: interfaceMethodInfo.parameters
                ? this.interfaceParameterToMdConverter.convertAll(interfaceMethodInfo.parameters, source, map, baseUrl)
                : undefined,
            description: description.length === 0 ? undefined : description,
            typeParameters: typeParameters,
            text: interfaceMethodInfo.text,
            returnType: this.typeToMdConverter.convert('', interfaceMethodInfo.returnType, source, map, baseUrl),
            name: interfaceMethodInfo.name,
        };
        const text = Nunjucks.renderString(INTERFACE_METHOD_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        interfaceMethodsInfo: InterfaceMethodInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        interfaceMethodsInfo.forEach(interfaceMethodInfo => {
            const text = this.convert(interfaceMethodInfo, source, map, baseUrl, commentOptions);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
