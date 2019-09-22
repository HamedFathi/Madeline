/* eslint-disable */
const safeStringify = require('fast-safe-stringify');
/* eslint-disable */

export class StringUtils {
    public isEmptyOrWhitespace(text: string): boolean {
        return text === null || text.match(/^ *$/) !== null;
    }

    public convertToOneWhitespace(text: string): string {
        return text.replace(/\s\s+/g, ' ');
    }

    public removeFirstAndLastQuote(text: any): any {
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

    public removeLineBreaks(text: string): string {
        const result = text.replace(/(\r\n|\n|\r)/gm, '');
        return result;
    }

    public joinLines(text: string | string[], separator : string = ' '): string {
        const lines: string[] = [];
        if (typeof text === 'string') {
            return this.joinLines(text.split(/\r?\n/));
        }

        text.forEach(line => {
            const result = this.removeLineBreaks(line).trim();
            lines.push(result);
        });

        const result = lines.join(separator);
        return result;
    }

    public nbsp(repetition?: number) {
        if (!repetition || repetition === 0) return '';
        const r = repetition && repetition > 0 ? repetition : 1;
        return '&nbsp;'.repeat(r);
    }

    public getBetweenChars(text: string, startDelimiter: string, endDelimiter: string): string | null {
        const afterStart = text.split(startDelimiter)[1];
        if (afterStart !== undefined) {
            const result = afterStart.split(endDelimiter)[0];
            if (result !== undefined) {
                return result;
            }
        }
        return null;
    }

    public stringify(obj: unknown): string {
        return JSON.stringify(obj, (k, v) => (v === undefined ? null : v));
    }

    public safeStringify(obj: unknown): string {
        return safeStringify(obj);
    }
}
