import * as nj from 'nunjucks';
import { CommentToMdConverter } from '../templates/comment/CommentToMdConverter';
import { ObjectUtils } from './ObjectUtils';
/* eslint-disable */
const mdTable = require('markdown-table');
/* eslint-disable */
const objUtils = new ObjectUtils();
const Nunjucks = new nj.Environment();

Nunjucks.addFilter('is_description_only', function(value) {
    if (!value) return false;
    if (objUtils.isArray(value) && (value as unknown[]).length === 1) {
        return (value as string[]).includes('description') ? true : false;
    } else {
        return false;
    }
});

Nunjucks.addFilter('is_available', function(value) {
    return objUtils.isAvailable(value);
});

Nunjucks.addFilter('to_md_table', function(tags, headers) {
    const tb = new CommentToMdConverter().toMdTable(tags, headers);
    return tb.length === 0 ? '' : mdTable(tb);
});

Nunjucks.addFilter('print', function(value, replacement, start, end, separator) {
    const s = start ? start : '';
    const e = end ? end : '';
    const r = replacement ? replacement : '';
    const p = separator ? separator : ', ';
    if (!value) {
        return r;
    }
    if (objUtils.isString(value) && objUtils.isEmpty(value)) {
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
