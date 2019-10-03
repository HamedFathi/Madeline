import * as fs from 'fs';
import * as traverse from 'traverse';

export class JsonUtils {
    public parseText(text: string, func?: (key: string, value: unknown) => unknown): object {
        const obj = JSON.parse(text, func);
        return obj;
    }

    public parseFile(filePath: string, func?: (key: string, value: unknown) => unknown): object {
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
        return this.convertJsObjectToJson(text) !== void 0;
    }

    public convertJsObjectToJson(jsObject: string): unknown {
        try {
            const obj = JSON.stringify(eval('(' + jsObject + ')'));
            const isJson = this.isJson(obj);
            return isJson ? JSON.parse(obj) : void 0;
        } catch {
            return void 0;
        }
    }

    public traverse(object: unknown, func: (node: unknown) => void): void {
        traverse(object).forEach(func);
    }
}
