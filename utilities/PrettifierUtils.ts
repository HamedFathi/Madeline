import * as prettier from 'prettier';

export class PrettierUtils {
    public prettify(text: string): string {
        const result = prettier.format(text, { parser: 'typescript' });
        return result;
    }
}
