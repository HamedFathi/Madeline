import { TYPE_TEMPLATE } from './TypeTemplate';
import { TypeMapInfo } from './TypeMapInfo';
import { TypeInfo } from '../../../../extractors/common/TypeInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { TypeTemplateInfo } from './TypeTemplateInfo';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { TypeCategory } from '../../../../extractors/common/TypeCategory';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';

export class TypeToMdConverter {
    constructor(private markdownUtils = new MarkdownUtils()) {}
    public convert(
        id: string,
        typeInfo: TypeInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string {
        const obj: TypeTemplateInfo = {
            value: typeInfo.value,
            details: [],
        };
        if (typeInfo.from) {
            const typeMapInfo = map(id, typeInfo.from, source, baseUrl);
            typeMapInfo.forEach(info => {
                if (obj.details) {
                    obj.details.push({
                        name: info.type,
                        path: info.path,
                    });
                }
            });
        } else {
            obj.details = undefined;
        }
        const text = Nunjucks.renderString(TYPE_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
