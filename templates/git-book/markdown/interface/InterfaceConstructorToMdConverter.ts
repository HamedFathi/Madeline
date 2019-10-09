import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { InterfaceConstructorInfo } from '../../../../extractors/interface/InterfaceConstructorInfo';
import { InterfaceParameterToMdConverter } from './InterfaceParameterToMdConverter';
import { InterfaceConstructorTemplateInfo } from './InterfaceConstructorTemplateInfo';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { INTERFACE_CONSTRUCTOR_TEMPLATE } from './InterfaceConstructorTemplate';

export class InterfaceConstructorToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private interfaceParameterToMdConverter = new InterfaceParameterToMdConverter(),
    ) {}
    public convert(
        interfaceConstructorInfo: InterfaceConstructorInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (interfaceConstructorInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(
                interfaceConstructorInfo.leadingComments,
                commentOptions,
            );
            description.concat(leading);
        }
        if (interfaceConstructorInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(
                interfaceConstructorInfo.trailingComments,
                commentOptions,
            );
            description.concat(trailing);
        }
        const typeParameters = interfaceConstructorInfo.typeParameters
            ? interfaceConstructorInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert('', x, source, map, baseUrl),
              )
            : undefined;
        const obj: InterfaceConstructorTemplateInfo = {
            parameters: interfaceConstructorInfo.parameters
                ? this.interfaceParameterToMdConverter.convertAll(
                      interfaceConstructorInfo.parameters,
                      source,
                      map,
                      baseUrl,
                      commentOptions,
                  )
                : undefined,
            description: description.length === 0 ? undefined : description,
            typeParameters: typeParameters,
            text: interfaceConstructorInfo.text,
            returnType: this.typeToMdConverter.convert('', interfaceConstructorInfo.returnType, source, map, baseUrl),
        };
        const text = Nunjucks.renderString(INTERFACE_CONSTRUCTOR_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
