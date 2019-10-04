import { EnumMemberTemplateInfo } from './EnumMemberTemplateInfo';
import { EnumTemplateInfo } from './EnumTemplateInfo';

import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { ENUM_TEMPLATE } from './EnumTemplate';
import { EnumInfo } from '../../../../extractors/enum/EnumInfo';
import { convertToOneWhitespace } from '../../../../utilities/StringUtils';

export class EnumToMdConverter {
    constructor(
        private commentToMdConverter = new CommentToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
    ) {}
    public convert(enumInfo: EnumInfo, commentOptions?: CommentToMdOption): string {
        const description: string[] = [];
        if (enumInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(enumInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (enumInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(enumInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const members: EnumMemberTemplateInfo[] = [];
        enumInfo.members.forEach(m => {
            const memberDescription: string[] = [];
            if (m.leadingComments) {
                const leading = this.commentToMdConverter.convertAll(m.leadingComments, commentOptions);
                memberDescription.concat(leading);
            }
            if (m.trailingComments) {
                const trailing = this.commentToMdConverter.convertAll(m.trailingComments, commentOptions);
                memberDescription.concat(trailing);
            }
            members.push({
                name: m.name,
                text: convertToOneWhitespace(m.text),
                hasComment: m.hasComment,
                value: m.value,
                description: description.length === 0 ? undefined : description,
            });
        });

        const modules = enumInfo.modules
            ? this.moduleToMdConverter.convert(enumInfo.modules, commentOptions)
            : undefined;
        const obj: EnumTemplateInfo = {
            description: description.length === 0 ? undefined : description,
            hasComment: enumInfo.hasComment,
            members: members,
            modifiers: enumInfo.modifiers,
            modules: modules,
            name: enumInfo.name,
            text: enumInfo.text,
        };
        const text = Nunjucks.renderString(ENUM_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
