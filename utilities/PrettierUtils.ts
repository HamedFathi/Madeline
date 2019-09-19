import * as prettier from 'prettier';
import { BuiltInParserName } from 'prettier';

export class PrettierUtils {
    public prettify(text: string, parserType?: BuiltInParserName): string {
        const result = prettier.format(text, { parser: parserType ? parserType : 'typescript' });
        return result;
    }
}
