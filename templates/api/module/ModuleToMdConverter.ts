import { ModuleInfo } from '../../../extractors/module/ModuleInfo';
import { PrettierUtils } from '../../../utilities/PrettierUtils';
import { MODULE_TEMPLATE } from './moduleTemplate';
import { ModuleTemplateInfo } from './ModuleTemplateInfo';
import { Nunjucks } from '../../../utilities/NunjucksUtils';
import { MarkdownUtils } from '../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { TemplateOptions } from '../../TemplateOptions';
import { CommentToMdOption } from '../comment/CommentToMdOption';

export class ModuleToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private prettierUtils = new PrettierUtils(),
        private markdownUtils = new MarkdownUtils(),
    ) {}
    public convert(moduleInfo: ModuleInfo[], commentOptions?: CommentToMdOption, options?: TemplateOptions): string[] {
        const md: string[] = [];
        const converter = this.commentToMdConverter;
        moduleInfo.forEach(m => {
            const description: string[] = [];
            if (m.leadingComments) {
                const leading = converter.convertAll(m.leadingComments, commentOptions, options);
                description.concat(leading);
            }
            if (m.trailingComments) {
                const trailing = converter.convertAll(m.trailingComments, commentOptions, options);
                description.concat(trailing);
            }
            const obj: ModuleTemplateInfo = {
                name: m.name,
                type: m.isNamespace ? 'namespace' : 'module',
                modifiers: m.modifiers,
                text: this.prettierUtils.prettify(m.text),
                description: description.length === 0 ? undefined : description,
                options: options,
            };
            const text = Nunjucks.renderString(MODULE_TEMPLATE, obj);
            const result = this.markdownUtils.purify(text);
            md.push(result);
        });

        return md;
    }
}
