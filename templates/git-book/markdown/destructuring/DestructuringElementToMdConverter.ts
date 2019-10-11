import { DestructuringElementInfo } from './../../../../extractors/destructuring/DestructuringElementInfo';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { DestructuringElementTemplateInfo } from './DestructuringElementTemplateInfo';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { DESTRUCTURING_ELEMENT_TEMPLATE } from './DestructuringElementTemplate';

export class DestructuringElementToMdConverter {
    constructor(private markdownUtils = new MarkdownUtils()) {}
    public convert(destructuringElementInfo: DestructuringElementInfo): string {
        const obj: DestructuringElementTemplateInfo = {
            name: destructuringElementInfo.name,
            propertyName: destructuringElementInfo.propertyName,
            isRest: destructuringElementInfo.isRest,
            text: destructuringElementInfo.text,
        };
        const text = Nunjucks.renderString(DESTRUCTURING_ELEMENT_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(destructuringElementsInfo: DestructuringElementInfo[]): string[] | undefined {
        const result: string[] = [];
        destructuringElementsInfo.forEach(destructuringElementInfo => {
            const text = this.convert(destructuringElementInfo);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
