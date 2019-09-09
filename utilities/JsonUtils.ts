import * as fs from 'fs';
import * as traverse from 'traverse';

export class JsonUtils {
    public parseText(text: string, func?: (key: string, value: any) => any): object {
        const obj = JSON.parse(text, func);
        return obj;
    }

    public parseFile(filePath: string, func?: (key: string, value: any) => any): object {
        const text = fs.readFileSync(filePath, 'utf8');
        const obj = JSON.parse(text, func);
        return obj;
    }

    public isJson(text: string): boolean {
        text = typeof text !== 'string' ? JSON.stringify(text) : text;
        try {
            text = JSON.parse(text);
        } catch (e) {
            return false;
        }
        if (typeof text === 'object' && text !== null) {
            return true;
        }
        return false;
    }

    public isJsonLike(text: string): boolean {
        return this.convertJsObjectToJson(text) !== undefined;
    }

    public convertJsObjectToJson(jsObject: string): any {
        try {
            let obj = JSON.stringify(eval('(' + jsObject + ')'));
            let isJson = this.isJson(obj);
            return isJson ? JSON.parse(obj) : undefined;
        } catch {
            return undefined;
        }
    }

    public traverse(object: unknown, func: (node: any) => void): void {
        traverse(object).forEach(func);
    }
}
