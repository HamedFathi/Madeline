import { ModuleInfo } from '../../../extractors/module/ModuleInfo';
import { PrettierUtils } from '../../../utilities/PrettierUtils';
import { MODULE_TEMPLATE } from './moduleTemplate';
import { ModuleTemplateInfo } from './ModuleTemplateInfo';
import { Nunjucks } from '../../../utilities/NunjucksUtils';
import { MarkdownUtils } from '../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { TemplateOptions } from '../../TemplateOptions';

export class ModuleToMdConverter {
    constructor(private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter()) {}
    public convert(moduleInfo: ModuleInfo[], option?: TemplateOptions): string[] {
        const md: string[] = [];
        const append = option && option.append ? true : false;
        const converter = this.commentToMdConverter;
        moduleInfo.forEach(m => {
            const description: string[] = [];
            if (m.leadingComments) {
                const leading = converter.convertAll(m.leadingComments);
                description.concat(leading);
            }
            if (m.trailingComments) {
                const trailing = converter.convertAll(m.trailingComments);
                description.concat(trailing);
            }
            const obj: ModuleTemplateInfo = {
                name: m.name,
                type: m.isNamespace ? 'namespace' : 'module',
                modifiers: m.modifiers,
                text: new PrettierUtils().prettify(m.text),
                description: description.length === 0 ? undefined : description,
                append: append,
            };
            const text = Nunjucks.renderString(MODULE_TEMPLATE, obj);
            const result = new MarkdownUtils().purify(text);
            md.push(result);
        });

        return md;
    }
}
