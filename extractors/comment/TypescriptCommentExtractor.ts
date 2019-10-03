import { CommentRange } from 'ts-morph';
import { CommentKind } from './CommentKind';
import { CommentInfo } from './CommentInfo';
import { JsDocExtractor } from './JsDocExtractor';
export class TypescriptCommentExtractor {

    constructor(private jsDocExtractor = new JsDocExtractor()) {
    }

    public extract(commentRanges: CommentRange[]): CommentInfo[] {
        const comments = Array<CommentInfo>();
        commentRanges.forEach(comment => {
            const text = comment.getText();
            const kind = comment.getKind() === 2
                ? CommentKind.JsSingleLine
                : CommentKind.JsMultiLine;
            const info = this.jsDocExtractor.extract(text, kind);
            comments.push(info);
        });
        return comments;
    }
}
