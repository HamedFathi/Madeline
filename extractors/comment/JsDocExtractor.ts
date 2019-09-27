import { isEmptyOrWhitespace, getBetweenChars } from '../../utilities/StringUtils';
import { TagInfo } from './TagInfo';
import { CommentInfo } from './CommentInfo';
import { CommentKind } from './CommentKind';

export class JsDocExtractor {
    private readonly WHITESPACE = ' ';
    private readonly AT_SIGN = '@';
    private readonly OPEN_CURLY_BRACKET = '{';
    private readonly CLOSE_CURLY_BRACKET = '}';
    private readonly OPEN_BRACKET = '[';
    private readonly CLOSE_BRACKET = ']';
    private readonly HYPHEN = '-';
    private readonly SINGLE_QUOTE = "'";
    private readonly DOUBLE_QUOTE = '"';
    private readonly NOTHING = '';
    private readonly START_JS_DOC = '/**';
    private readonly START_JS_DOC_UNUSUAL = '/*';
    private readonly END_JS_DOC_UNUSUAL = '**/';
    private readonly END_JS_DOC = '*/';

    public extract(comment: string, kind: CommentKind): CommentInfo {
        const text = comment;
        const tags: TagInfo[] = [];
        const generalDescription: string[] = [];
        let firstTagVisited = false;
        const commentLines = this.readJsDocLines(text);
        let tagIndex = -1;
        commentLines.forEach(line => {
            const hasTag = line[0] === this.AT_SIGN;
            // In first visit of a tag, firstTagVisited is changed to true forever.
            if (hasTag) {
                firstTagVisited = true;
                // If we found any tag with keep index of it.
                ++tagIndex;
            }
            // global description(s) - titles
            if (!firstTagVisited) {
                generalDescription.push(line);
            } else {
                // A comment with tag
                if (hasTag) {
                    const firstSpaceAfterTagIndex = line.indexOf(this.WHITESPACE);
                    let tag = firstSpaceAfterTagIndex === -1 ? line : line.substring(0, firstSpaceAfterTagIndex);
                    let type = getBetweenChars(line, this.OPEN_CURLY_BRACKET, this.CLOSE_CURLY_BRACKET);
                    let defaultValue = getBetweenChars(line, this.OPEN_BRACKET, this.CLOSE_BRACKET);
                    let description =
                        line.lastIndexOf(this.HYPHEN) === -1 ? null : line.substring(line.lastIndexOf(this.HYPHEN) + 1);
                    if (tag && tag.length > 0) {
                        line = line.replace(tag, this.NOTHING);
                        tag = tag.trim();
                    }
                    if (type && type.length > 0) {
                        line = line.replace(
                            `${this.OPEN_CURLY_BRACKET}${type}${this.CLOSE_CURLY_BRACKET}`,
                            this.NOTHING,
                        );
                        type = type.trim();
                    }
                    if (defaultValue && defaultValue.length > 0) {
                        line = line.replace(`${this.OPEN_BRACKET}${defaultValue}${this.CLOSE_BRACKET}`, this.NOTHING);
                        const dv = defaultValue.trim().split('=');
                        if (dv && dv.length == 2 && dv[0] === 'defaultValue') defaultValue = dv[1];
                    }
                    if (description && description.length > 0) {
                        line = line.replace(`${this.HYPHEN}${description}`, this.NOTHING);
                        description = description.trim();
                    }

                    let names = isEmptyOrWhitespace(line.trim()) ? void 0 : line.trim();
                    if (names && names[0] === this.DOUBLE_QUOTE && names[names.length - 1] === this.DOUBLE_QUOTE) {
                        names = names.substring(1);
                        names = names.substring(0, names.length - 1);
                    }
                    if (names && names[0] === this.SINGLE_QUOTE && names[names.length - 1] === this.SINGLE_QUOTE) {
                        names = names.substring(1);
                        names = names.substring(0, names.length - 1);
                    }
                    tags.push({
                        tag: tag,
                        type: type === null ? void 0 : type,
                        name: names === void 0 ? void 0 : names.split('.').filter(x => x.length !== 0),
                        defaultValue: defaultValue === null ? void 0 : defaultValue,
                        description: description === null ? void 0 : [description],
                    });
                }
                // A description after a tag
                else {
                    if (!tags[tagIndex]['description']) {
                        tags[tagIndex]['description'] = [];
                    }
                    /* eslint-disable */
                    //@ts-ignore
                    tags[tagIndex]['description'].push(line);
                    /* eslint-disable */
                }
            }
        });
        return {
            text: isEmptyOrWhitespace(text) ? undefined : text,
            kind: kind,
            kindName:
                kind === CommentKind.Html ? 'HTML' : kind === CommentKind.JsSingleLine ? 'JsSingleLine' : 'JsMultiLine',
            description: generalDescription.length === 0 ? undefined : generalDescription,
            tags: tags.length === 0 ? undefined : tags,
        };
    }

    private readJsDocLines(text: string): string[] {
        const result = text
            .replace(this.START_JS_DOC, this.NOTHING)
            .replace(this.START_JS_DOC_UNUSUAL, this.NOTHING)
            .replace(this.END_JS_DOC_UNUSUAL, this.NOTHING)
            .replace(this.END_JS_DOC, this.NOTHING)
            .split(/\r?\n/)
            .map(x => x.replace(/\*+/, this.NOTHING).trim())
            .map(x => x.replace(/\/+/, this.NOTHING).trim())
            .filter(x => !isEmptyOrWhitespace(x))
            .map(x => (x[0] && x[0] === this.HYPHEN) ? x.substr(1).trim() : x);
        return result;
    }
}
