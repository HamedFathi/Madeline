import * as nj from 'nunjucks';
import { ObjectUtils } from './ObjectUtils';
import { TagInfo } from '../extractors/comment/TagInfo';
import { CommentToMdConverter } from '../templates/git-book/markdown/comment/CommentToMdConverter';
import { TypeDetailTemplateInfo } from '../templates/git-book/markdown/type/TypeDetailTemplateInfo';
import { nbsp } from './StringUtils';
/* eslint-disable */
const mdTable = require('markdown-table');
/* eslint-disable */
const MARK : string = '✔';
const CROSS : string = '✘';
const objUtils = new ObjectUtils();
const Nunjucks = nj.configure({ autoescape: false });
function isDescriptionOnly(value: string[]): boolean {
    return value && value.length === 1 && value.includes('description') ? true : false;
}

Nunjucks.addFilter('is_available', function (value: string | unknown[]): boolean {
    return objUtils.isAvailable(value);
});

Nunjucks.addFilter('print_boolean', function (value:boolean): string {
    // return value ? '✔':'❌';
    //return value ? '✓' : '⨯'
    //return value ? '☑' : '❎';
    //return value ? '✔':'✖';
    return value ? MARK:CROSS;
});

Nunjucks.addFilter('whitespace', function (value:string, count:number): string {
    return nbsp(count)+value;
});

Nunjucks.addFilter('print_modifiers', function (modifiers:string[]): string {

let result : string[] = [];
    let values = modifiers.filter(x=>x !== 'export');
    for (const v of values) {
        result.push(`${MARK} ${v}`);
    }
    return result.join('\n');
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

Nunjucks.addFilter('write', function (value: TagInfo[], append: boolean, headers?: string[]) {
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
            let description = append ? descriptions.join(' ') : descriptions.join('\n');
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
    const hasStartTripleBacktick = s.includes('```');
    const e = end ? end : '';
    const hasEndTripleBacktick = e.includes('```');
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
    return (hasStartTripleBacktick ? '\n'+s+'\n': s) + value + (hasEndTripleBacktick ? '\n'+e+'\n': e);
});

export { Nunjucks };
