
import { CommentRange } from 'ts-morph';
import { CommentKind } from './CommentKind';
import { CommentInfo } from './CommentInfo';
import { JsDocExtractor } from './JsDocExtractor';
export class TypescriptCommentExtractor {

    private readonly jsDocExtractor = new JsDocExtractor();
    public extract(commentRanges: CommentRange[]): CommentInfo[] {
        let comments = Array<CommentInfo>();
        commentRanges.forEach(comment => {
            let text = comment.getText();
            let kind = comment.getKind() === 2 ? CommentKind.JsSingleLine : CommentKind.JsMultiLine;
            let info = this.jsDocExtractor.extract(text, kind);
            comments.push(info);
        });
        return comments;
    }
}