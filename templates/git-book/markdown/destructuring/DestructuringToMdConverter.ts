import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { DestructuringInfo } from '../../../../extractors/destructuring/DestructuringInfo';

export class DestructuringToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
    ) {}
    public convert(destructuringInfo: DestructuringInfo, commentOptions?: CommentToMdOption): string {
        return '';
    }
}
