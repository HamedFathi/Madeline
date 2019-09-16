import { CommentInfo } from '../../extractors/comment/CommentInfo';
import { CommentToMdOption } from './CommentToMdOption';
import { CommentGroup } from './CommentGroup';
import { Nunjucks } from '../../utilities/NunjucksUtils';
import { COMMENT_TEMPLATE } from './CommentTemplate';
import { MarkdownUtils } from '../../utilities/MarkdownUtils';
import { TagInfo } from '../../extractors/comment/TagInfo';
import { CommentTemplateInfo } from './CommentTemplateInfo';
import { TemplateOption } from '../TemplateOption';

export class CommentToMdConverter {
    public convertAll(
        commentInfo: CommentInfo[],
        commentOption?: CommentToMdOption,
        option?: TemplateOption,
    ): string[] {
        const md: string[] = [];
        commentInfo.forEach(comment => {
            const text = this.convert(comment, commentOption, option);
            md.push(text);
        });
        return md;
    }
    public convert(commentInfo: CommentInfo, commentOption?: CommentToMdOption, option?: TemplateOption): string {
        const result: string[] = [];
        const append = option && option.append ? true : false;
        // with tags
        if (commentInfo.tags) {
            const groupedTags = new CommentGroup().groupByTagName(commentInfo.tags, commentOption);
            groupedTags.forEach(obj => {
                const commentTemplateInfo: CommentTemplateInfo = {
                    title: obj.title,
                    headers: obj.headers,
                    tags: obj.tags,
                    description: commentInfo.description,
                    append: append,
                };
                const text = Nunjucks.renderString(COMMENT_TEMPLATE, commentTemplateInfo);
                const md = new MarkdownUtils().purify(text);
                result.push(md);
            });
        }
        // only global description
        else {
            if (commentInfo.description) {
                const commentTemplateInfo: CommentTemplateInfo = {
                    append: append,
                    title: undefined,
                    headers: undefined,
                    tags: undefined,
                    description: commentInfo.description,
                };
                const text = Nunjucks.renderString(COMMENT_TEMPLATE, commentTemplateInfo);
                const md = new MarkdownUtils().purify(text);
                result.push(md);
            }
        }
        const md = result.length === 0 ? '' : result.join('\n\n');
        return md;
    }

    public toMdTable(tags: TagInfo[], headers: string[], append = true): string[][] {
        if (!headers || !tags) return [];
        if (headers.length === 0 || tags.length === 0) return [];

        const result: string[][] = [];
        tags.forEach(tag => {
            const item: string[] = [];
            if (headers.includes('name')) {
                const name = tag.name ? tag.name.join('.') : '-';
                item.push(name);
            }
            if (headers.includes('type')) {
                const type = tag.type ? tag.type : '-';
                item.push(type);
            }
            if (headers.includes('defaultValue')) {
                const defaultValue = tag.defaultValue ? tag.defaultValue : '-';
                item.push(defaultValue);
            }
            if (headers.includes('description')) {
                const description = tag.description
                    ? append
                        ? tag.description.join(' ')
                        : tag.description.join('\n')
                    : '-';
                item.push(description);
            }
            result.push(item);
        });

        return result.length === 0 ? [] : result;
    }
}
