import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { FunctionInfo } from '../../../../extractors/function/FunctionInfo';

export class FunctionToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
    ) {}
    public convert(functionInfo: FunctionInfo, commentOptions?: CommentToMdOption): string {
        return '';
    }
}
