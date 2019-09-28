/* eslint-disable */
const safeStringify = require('fast-safe-stringify');
/* eslint-disable */


function isEmptyOrWhitespace(text: string): boolean {
    return text === null || text.match(/^ *$/) !== null;
}

function convertToOneWhitespace(text: string): string {
    return text.replace(/\s\s+/g, ' ');
}

function removeFirstAndLastQuote(text: any): any {
    if (typeof text === 'string' && text[0] === '"' && text[text.length - 1] === '"') {
        if (text[0] === '"') text = text.substring(1);
        if (text[text.length - 1] === '"') text = text.substring(0, text.length - 1);
        return text;
    }
    if (typeof text === 'string' && text[0] === "'" && text[text.length - 1] === "'") {
        if (text[0] === "'") text = text.substring(1);
        if (text[text.length - 1] === "'") text = text.substring(0, text.length - 1);
        return text;
    }
    return text;
}

function removeLineBreaks(text: string): string {
    const result = text.replace(/(\r\n|\n|\r)/gm, '');
    return result;
}

function joinLines(text: string | string[], separator: string = ' '): string {
    const lines: string[] = [];
    if (typeof text === 'string') {
        return joinLines(text.split(/\r?\n/));
    }

    text.forEach(line => {
        const result = removeLineBreaks(line).trim();
        lines.push(result);
    });

    const result = lines.join(separator);
    return result;
}

function nbsp(repetition?: number) {
    if (!repetition || repetition === 0) return '';
    const r = repetition && repetition > 0 ? repetition : 1;
    return '&nbsp;'.repeat(r);
}

function tab(repetition?: number) {
    if (!repetition || repetition === 0) return '';
    const r = repetition && repetition > 0 ? repetition : 1;
    return '\t'.repeat(r);
}

function getBetweenChars(text: string, startDelimiter: string, endDelimiter: string): string | null {
    const afterStart = text.split(startDelimiter)[1];
    if (afterStart !== void 0) {
        const result = afterStart.split(endDelimiter)[0];
        if (result !== void 0) {
            return result;
        }
    }
    return null;
}

function stringify(obj: unknown): string {
    return JSON.stringify(obj, (k, v) => (v === void 0 ? null : v));
}

export {
    nbsp,
    tab,
    joinLines,
    stringify,
    getBetweenChars,
    removeLineBreaks,
    isEmptyOrWhitespace,
    removeFirstAndLastQuote,
    convertToOneWhitespace
};
