import { ModuleToMdConverter } from './../module/ModuleToMdConverter';
import { DestructuringElementToMdConverter } from './DestructuringElementToMdConverter';
import { DestructuringTemplateInfo } from './DestructuringTemplateInfo';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { DestructuringInfo } from '../../../../extractors/destructuring/DestructuringInfo';
import { prettify } from '../../../../utilities/PrettierUtils';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { DESTRUCTURING_TEMPLATE } from './DestructuringTemplate';

export class DestructuringToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
        private destructuringElementToMdConverter = new DestructuringElementToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
    ) { }
    public convert(destructuringInfo: DestructuringInfo, commentOptions?: CommentToMdOption): string {
        const description: string[] = [];
        if (destructuringInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(destructuringInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (destructuringInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(destructuringInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const modules = destructuringInfo.modules
            ? this.moduleToMdConverter.convert(destructuringInfo.modules, commentOptions)
            : undefined;
        const obj: DestructuringTemplateInfo = {
            initializer: destructuringInfo.initializer,
            modules: modules,
            modifiers: destructuringInfo.modifiers,
            text: prettify(destructuringInfo.text),
            description: description.length === 0 ? undefined : description,
            isArrayDestructuring: destructuringInfo.isArrayDestructuring,
            kindName: destructuringInfo.kindName,
            typeReference: destructuringInfo.typeReference,
            elements: this.destructuringElementToMdConverter.convertAll(destructuringInfo.elements),
        };
        const text = Nunjucks.renderString(DESTRUCTURING_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        destructuringInfo: DestructuringInfo[],
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        destructuringInfo.forEach(destructuring => {
            const text = this.convert(destructuring, commentOptions);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
