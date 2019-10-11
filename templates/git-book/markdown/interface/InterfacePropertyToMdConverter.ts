import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { InterfacePropertyInfo } from '../../../../extractors/interface/InterfacePropertyInfo';
import { InterfacePropertyTemplateInfo } from './InterfacePropertyTemplateInfo';
import { INTERFACE_PROPERTY_TEMPLATE } from './InterfacePropertyTemplate';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';

export class InterfacePropertyToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeToMdConverter = new TypeToMdConverter(),
    ) {}
    public convert(
        interfacePropertyInfo: InterfacePropertyInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (interfacePropertyInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(interfacePropertyInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (interfacePropertyInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(
                interfacePropertyInfo.trailingComments,
                commentOptions,
            );
            description.concat(trailing);
        }
        const obj: InterfacePropertyTemplateInfo = {
            description: description.length === 0 ? undefined : description,
            text: interfacePropertyInfo.text,
            name: interfacePropertyInfo.name,
            isOptional: interfacePropertyInfo.isOptional,
            type: this.typeToMdConverter.convert('', interfacePropertyInfo.type, source, map, baseUrl),
        };
        const text = Nunjucks.renderString(INTERFACE_PROPERTY_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        interfacePropertiesInfo: InterfacePropertyInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        interfacePropertiesInfo.forEach(interfacePropertyInfo => {
            const text = this.convert(interfacePropertyInfo, source, map, baseUrl, commentOptions);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
