import { TemplateOptions } from '../../TemplateOptions';
import { TypeParameterInfo } from '../../../extractors/type-parameter/TypeParameterInfo';
import { TypeParameterTemplateInfo } from './TypeParameterTemplateInfo';
import { TYPE_PARAMETER_TEMPLATE } from './TypeParameterTemplate';
import { Nunjucks } from '../../../utilities/NunjucksUtils';
import { MarkdownUtils } from '../../../utilities/MarkdownUtils';

export class TypeParameterToMdConverter {
    constructor(private markdownUtils = new MarkdownUtils()) {}
    public convert(typeParameterInfo: TypeParameterInfo, options?: TemplateOptions): string {
        const obj: TypeParameterTemplateInfo = typeParameterInfo;
        const text = Nunjucks.renderString(TYPE_PARAMETER_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
