import { TypeMapInfo } from './../type/TypeMapInfo';
import { TypeParameterInfo } from './../../../../extractors/type-parameter/TypeParameterInfo';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { TypeParameterTemplateInfo } from './TypeParameterTemplateInfo';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { TYPE_PARAMETER_TEMPLATE } from './TypeParameterTemplate';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeToMdConverter } from '../type/TypeToMdConverter';

export class TypeParameterToMdConverter {
    constructor(private markdownUtils = new MarkdownUtils(), private typeToMdConverter = new TypeToMdConverter()) {}
    public convert(
        id: string,
        typeParameterInfo: TypeParameterInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string {
        let constraint = '';
        if (typeParameterInfo.constraint) {
            if (typeParameterInfo.constraint.from) {
                constraint = this.typeToMdConverter.convert(id, typeParameterInfo.constraint, source, map, baseUrl);
            } else {
                constraint = typeParameterInfo.constraint.value;
            }
        }
        const obj: TypeParameterTemplateInfo = {
            name: typeParameterInfo.name,
            text: typeParameterInfo.text,
            constraint: constraint === '' ? undefined : constraint,
        };
        const text = Nunjucks.renderString(TYPE_PARAMETER_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
