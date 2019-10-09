import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { InterfaceExtendsInfo } from '../../../../extractors/interface/InterfaceExtendsInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { InterfaceExtendsTemplateInfo } from './InterfaceExtendsTemplateInfo';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { INTERFACE_EXTENDS_TEMPLATE } from './InterfaceExtendsTemplate';

export class InterfaceExtendsToMdConverter {
    constructor(private markdownUtils = new MarkdownUtils(), private typeToMdConverter = new TypeToMdConverter()) {}
    public convert(
        interfaceExtendsInfo: InterfaceExtendsInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string {
        const obj: InterfaceExtendsTemplateInfo = {
            name: interfaceExtendsInfo.name,
            type: this.typeToMdConverter.convert('', interfaceExtendsInfo.type, source, map, baseUrl),
        };
        const text = Nunjucks.renderString(INTERFACE_EXTENDS_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        interfaceExtendsInfo: InterfaceExtendsInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string[] | undefined {
        const result: string[] = [];
        interfaceExtendsInfo.forEach(ext => {
            const text = this.convert(ext, source, map, baseUrl);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
