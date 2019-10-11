import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { InterfaceParameterInfo } from '../../../../extractors/interface/InterfaceParameterInfo';
import { INTERFACE_PARAMETER_TEMPLATE } from './InterfaceParameterTemplate';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { InterfaceParameterTemplateInfo } from './InterfaceParameterTemplateInfo';

export class InterfaceParameterToMdConverter {
    constructor(private markdownUtils = new MarkdownUtils(), private typeToMdConverter = new TypeToMdConverter()) {}
    public convert(
        interfaceParameterInfo: InterfaceParameterInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string {
        const obj: InterfaceParameterTemplateInfo = {
            initializer: interfaceParameterInfo.initializer,
            type: this.typeToMdConverter.convert('', interfaceParameterInfo.type, source, map, baseUrl),
            isOptional: interfaceParameterInfo.isOptional,
            isParameterProperty: interfaceParameterInfo.isParameterProperty,
            isRest: interfaceParameterInfo.isRest,
            name: interfaceParameterInfo.name,
            modifiers: interfaceParameterInfo.modifiers,
            text: interfaceParameterInfo.text,
        };
        const text = Nunjucks.renderString(INTERFACE_PARAMETER_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        interfaceParametersInfo: InterfaceParameterInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string[] | undefined {
        const result: string[] = [];
        interfaceParametersInfo.forEach(interfaceParameterInfo => {
            const text = this.convert(interfaceParameterInfo, source, map, baseUrl);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
