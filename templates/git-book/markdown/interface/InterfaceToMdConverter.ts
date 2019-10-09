import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { InterfaceInfo } from '../../../../extractors/interface/InterfaceInfo';

export class InterfaceToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
    ) {}
    public convert(
        interfaceInfo: InterfaceInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (interfaceInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(interfaceInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (interfaceInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(interfaceInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const typeParameters = interfaceInfo.typeParameters
            ? interfaceInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert(interfaceInfo.id, x, source, map, baseUrl),
              )
            : undefined;
        /*const obj: InterfaceTemplateInfo = {
            name:interfaceInfo.name,
            extends:interfaceInfo.extends,
        };
        const text = Nunjucks.renderString(INTERFACE_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;*/
        return '';
    }

    public convertAll(
        interfacesInfo: InterfaceInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        interfacesInfo.forEach(interfaceInfo => {
            const text = this.convert(interfaceInfo, source, map, baseUrl, commentOptions);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
