import { StringUtils } from '../utilities/StringUtils';

export class MarkdownUtils {
    private readonly EMPTY = '';
    private readonly BREAK_LINE = '\n';
    private readonly BREAK_LINES = '\n\n';
    public purify(text: string, trim = true): string {
        const result = text
            .split(this.BREAK_LINE)
            .map(x => (new StringUtils().isEmptyOrWhitespace(x) ? this.EMPTY : trim ? x.trim() : x))
            .join(this.BREAK_LINE)
            .replace(/\n{2,}/g, this.BREAK_LINES)
            .trim();
        return result + this.BREAK_LINES;
    }
}
