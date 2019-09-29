import { isEmptyOrWhitespace, getBetweenChars } from '../../utilities/StringUtils';
import { TagInfo } from './TagInfo';
import { CommentInfo } from './CommentInfo';
import { CommentKind } from './CommentKind';

const WHITESPACE = ' ';
const AT_SIGN = '@';
const OPEN_CURLY_BRACKET = '{';
const CLOSE_CURLY_BRACKET = '}';
const OPEN_BRACKET = '[';
const CLOSE_BRACKET = ']';
const HYPHEN = '-';
const SINGLE_QUOTE = "'";
const DOUBLE_QUOTE = '"';
const NOTHING = '';
const START_JS_DOC = '/**';
const START_JS_DOC_UNUSUAL = '/*';
const END_JS_DOC_UNUSUAL = '**/';
const END_JS_DOC = '*/';

const readJsDocLines = function(text: string): string[] {
    const result = text
        .replace(START_JS_DOC, NOTHING)
        .replace(START_JS_DOC_UNUSUAL, NOTHING)
        .replace(END_JS_DOC_UNUSUAL, NOTHING)
        .replace(END_JS_DOC, NOTHING)
        .split(/\r?\n/)
        .map(x => x.replace(/\*+/, NOTHING).trim())
        .map(x => x.replace(/\/+/, NOTHING).trim())
        .filter(x => !isEmptyOrWhitespace(x))
        .map(x => (x[0] && x[0] === HYPHEN ? x.substr(1).trim() : x));
    return result;
};

export class JsDocExtractor {
    public extract(comment: string, kind: CommentKind): CommentInfo {
        const text = comment;
        const tags: TagInfo[] = [];
        const generalDescription: string[] = [];
        let firstTagVisited = false;
        const commentLines = readJsDocLines(text);
        let tagIndex = -1;
        commentLines.forEach(line => {
            const hasTag = line[0] === AT_SIGN;
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
                    const firstSpaceAfterTagIndex = line.indexOf(WHITESPACE);
                    let tag = firstSpaceAfterTagIndex === -1 ? line : line.substring(0, firstSpaceAfterTagIndex);
                    let type = getBetweenChars(line, OPEN_CURLY_BRACKET, CLOSE_CURLY_BRACKET);
                    let defaultValue = getBetweenChars(line, OPEN_BRACKET, CLOSE_BRACKET);
                    let description =
                        line.lastIndexOf(HYPHEN) === -1 ? null : line.substring(line.lastIndexOf(HYPHEN) + 1);
                    if (tag && tag.length > 0) {
                        line = line.replace(tag, NOTHING);
                        tag = tag.trim();
                    }
                    if (type && type.length > 0) {
                        line = line.replace(`${OPEN_CURLY_BRACKET}${type}${CLOSE_CURLY_BRACKET}`, NOTHING);
                        type = type.trim();
                    }
                    if (defaultValue && defaultValue.length > 0) {
                        line = line.replace(`${OPEN_BRACKET}${defaultValue}${CLOSE_BRACKET}`, NOTHING);
                        const dv = defaultValue.trim().split('=');
                        if (dv && dv.length == 2 && dv[0] === 'defaultValue') defaultValue = dv[1];
                    }
                    if (description && description.length > 0) {
                        line = line.replace(`${HYPHEN}${description}`, NOTHING);
                        description = description.trim();
                    }

                    let names = isEmptyOrWhitespace(line.trim()) ? void 0 : line.trim();
                    if (names && names[0] === DOUBLE_QUOTE && names[names.length - 1] === DOUBLE_QUOTE) {
                        names = names.substring(1);
                        names = names.substring(0, names.length - 1);
                    }
                    if (names && names[0] === SINGLE_QUOTE && names[names.length - 1] === SINGLE_QUOTE) {
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
            text: isEmptyOrWhitespace(text) ? void 0 : text,
            kind: kind,
            kindName:
                kind === CommentKind.Html ? 'HTML' : kind === CommentKind.JsSingleLine ? 'JsSingleLine' : 'JsMultiLine',
            description: generalDescription.length === 0 ? void 0 : generalDescription,
            tags: tags.length === 0 ? void 0 : tags,
        };
    }
}
