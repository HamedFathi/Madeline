import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { DecoratorInfo } from '../../../../extractors/decorator/DecoratorInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { DecoratorTemplateInfo } from './DecoratorTemplateInfo';
import { DecoratorParameterTemplateInfo } from './DecoratorParameterTemplateInfo';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { DECORATOR_TEMPLATE } from './DecoratorTemplate';

export class DecoratorToMdConverter {
    constructor(private typeToMdConverter = new TypeToMdConverter(), private markdownUtils = new MarkdownUtils()) {}
    public convert(
        decorators: DecoratorInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string {
        const templateInfo: DecoratorTemplateInfo[] = [];
        for (const decorator of decorators) {
            const paramTemplateInfo: DecoratorParameterTemplateInfo[] = [];
            if (decorator.parameters) {
                for (const param of decorator.parameters) {
                    paramTemplateInfo.push({
                        value: param.value,
                        type: this.typeToMdConverter.convert(decorator.id, param.type, source, map, baseUrl),
                    });
                }
            }
            templateInfo.push({
                name: decorator.name,
                isDecoratorFactory: decorator.isDecoratorFactory,
                parameters: paramTemplateInfo.length === 0 ? undefined : paramTemplateInfo,
            });
        }
        const result: string[] = [];
        for (const obj of templateInfo) {
            const text = Nunjucks.renderString(DECORATOR_TEMPLATE, obj);
            result.push(text);
        }
        const md = this.markdownUtils.purify(result.join('\n'));
        return md;
    }
}
