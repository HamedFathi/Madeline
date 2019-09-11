import { CommentTagNameReplacer } from './CommentTagNameReplacer';
export interface CommentToMdOption {
    appendDescriptions: boolean;
    mergeComments: boolean;
    replacers: CommentTagNameReplacer[];
}
