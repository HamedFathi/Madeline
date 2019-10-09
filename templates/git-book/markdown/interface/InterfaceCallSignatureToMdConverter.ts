import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { InterfaceCallSignatureInfo } from '../../../../extractors/interface/InterfaceCallSignatureInfo';
import { InterfaceCallSignatureTemplateInfo } from './InterfaceCallSignatureTemplateInfo';
import { InterfaceParameterInfo } from '../../../../extractors/interface/InterfaceParameterInfo';
import { InterfaceParameterToMdConverter } from './InterfaceParameterToMdConverter';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { INTERFACE_CALL_SIGNATURE_TEMPLATE } from './InterfaceCallSignatureTemplate';

export class InterfaceCallSignatureToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private interfaceParameterToMdConverter = new InterfaceParameterToMdConverter(),
    ) {}
    public convert(
        interfaceCallSignatureInfo: InterfaceCallSignatureInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (interfaceCallSignatureInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(
                interfaceCallSignatureInfo.leadingComments,
                commentOptions,
            );
            description.concat(leading);
        }
        if (interfaceCallSignatureInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(
                interfaceCallSignatureInfo.trailingComments,
                commentOptions,
            );
            description.concat(trailing);
        }
        const typeParameters = interfaceCallSignatureInfo.typeParameters
            ? interfaceCallSignatureInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert('', x, source, map, baseUrl),
              )
            : undefined;
        const obj: InterfaceCallSignatureTemplateInfo = {
            parameters: interfaceCallSignatureInfo.parameters
                ? this.interfaceParameterToMdConverter.convertAll(
                      interfaceCallSignatureInfo.parameters,
                      source,
                      map,
                      baseUrl,
                      commentOptions,
                  )
                : undefined,
            description: description.length === 0 ? undefined : description,
            typeParameters: typeParameters,
            text: interfaceCallSignatureInfo.text,
            returnType: this.typeToMdConverter.convert('', interfaceCallSignatureInfo.returnType, source, map, baseUrl),
        };
        const text = Nunjucks.renderString(INTERFACE_CALL_SIGNATURE_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
