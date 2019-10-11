import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { InterfaceIndexerInfo } from '../../../../extractors/interface/InterfaceIndexerInfo';
import { InterfaceIndexerTemplateInfo } from './InterfaceIndexerTemplateInfo';
import { INTERFACE_INDEXER_TEMPLATE } from './InterfaceIndexerTemplate';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';

export class InterfaceIndexerToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
    ) {}
    public convert(
        interfaceIndexerInfo: InterfaceIndexerInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (interfaceIndexerInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(interfaceIndexerInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (interfaceIndexerInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(
                interfaceIndexerInfo.trailingComments,
                commentOptions,
            );
            description.concat(trailing);
        }
        const obj: InterfaceIndexerTemplateInfo = {
            description: description.length === 0 ? undefined : description,
            text: interfaceIndexerInfo.text,
            returnType: this.typeToMdConverter.convert('', interfaceIndexerInfo.returnType, source, map, baseUrl),
            key: interfaceIndexerInfo.key,
            value: this.typeToMdConverter.convert('', interfaceIndexerInfo.value, source, map, baseUrl),
        };
        const text = Nunjucks.renderString(INTERFACE_INDEXER_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        interfaceIndexersInfo: InterfaceIndexerInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        interfaceIndexersInfo.forEach(interfaceIndexerInfo => {
            const text = this.convert(interfaceIndexerInfo, source, map, baseUrl, commentOptions);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
