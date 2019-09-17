import { TagInfo } from '../../extractors/comment/TagInfo';
import { CommentGroupInfo } from './CommentGroupInfo';
export interface CommentTemplateInfo {
    description: string[] | undefined;
    details: CommentGroupInfo[] | undefined;
    append: boolean;
}
