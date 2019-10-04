import * as nj from 'nunjucks';
import { ObjectUtils } from './ObjectUtils';
import { TagInfo } from '../extractors/comment/TagInfo';
import { TemplateOptions } from '../templates/TemplateOptions';
import { CommentToMdConverter } from '../templates/git-book/markdown/comment/CommentToMdConverter';
import { TypeDetailTemplateInfo } from '../templates/git-book/markdown/type/TypeDetailTemplateInfo';
/* eslint-disable */
const mdTable = require('markdown-table');
/* eslint-disable */
const objUtils = new ObjectUtils();
const Nunjucks = new nj.Environment();
function isDescriptionOnly(value: string[]): boolean {
    return value && value.length === 1 && value.includes('description') ? true : false;
}

Nunjucks.addFilter('is_available', function (value: string | unknown[]): boolean {
    return objUtils.isAvailable(value);
});

Nunjucks.addFilter('type_link', function (value: string, details: TypeDetailTemplateInfo[] | undefined): string {
    if (details) {
        details.forEach(detail => {
            let regex = new RegExp(detail.name, "g");
            value = value.replace(regex, `[${detail.name}](${detail.path})`);
        });
        return value;
    }
    else {
        return value;
    }
});

Nunjucks.addFilter('write', function (value: TagInfo[], options?: TemplateOptions, headers?: string[]) {
    let isDescriptionOnly = headers && headers.length === 1 && headers.includes('description') ? true : false;
    if (headers) {
        if (isDescriptionOnly) {
            let descriptions: string[] = [];
            let allDescriptions = value.map(x => x.description);
            allDescriptions.forEach(desc => {
                if (desc) {
                    desc.forEach(d => {
                        descriptions.push(d);
                    });
                }
            });
            if (descriptions.length === 0) return "";
            let description = (options && options.append) ? descriptions.join(' ') : descriptions.join('\n');
            return description;
        }
        const tb = new CommentToMdConverter().toMdTable(value, headers);
        let table = tb.length === 0 ? '' : mdTable(tb);
        return table;
    }
    return "";
});

Nunjucks.addFilter('print', function (value: string | unknown[], replacement: string, start: string, end: string, separator: string) {
    const s = start ? start : '';
    const e = end ? end : '';
    const r = replacement ? replacement : '';
    const p = separator ? separator : ', ';
    if (!value) {
        return r;
    }
    if (objUtils.isString(value) && objUtils.isEmpty(value as string)) {
        return r;
    }
    if (objUtils.isArray(value) && !objUtils.hasLength(value)) {
        return r;
    }
    if (objUtils.isArray(value) && objUtils.hasLength(value)) {
        const result = (value as unknown[]).map(x => s + x + e).join(p);
        return result;
    }
    return s + value + e;
});

export { Nunjucks };
