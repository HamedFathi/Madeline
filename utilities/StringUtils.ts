const safeStringify = require('fast-safe-stringify');

export class StringUtils {
    public isEmptyOrWhitespace(text: string): boolean {
        return text === null || text.match(/^ *$/) !== null;
    }

    public convertToAWhitespace(text: string): string {
        return text.replace(/\s\s+/g, ' ');
    }

    public removeFirstLastQuote(text: any): any {
        if (typeof text === 'string') {
            if (text[0] === '"') text = text.substring(1);
            if (text[text.length - 1] === '"') text = text.substring(0, text.length - 1);
            return text;
        }
        return text;
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

    public detectImport(text: string): [string, string] {
        let result: [string, string] = ['', ''];
        const regex = /import\(.+\)./;
        if (regex.test(text)) {
            const name = text.replace(regex, '');
            // @ts-ignore
            const imp = text
                .match(regex)[0]
                .replace('import("', '')
                .replace('").', '');
            result = [name.trim(), imp.trim()];
        } else {
            result = [text.trim(), ''];
        }
        return result;
    }
}
