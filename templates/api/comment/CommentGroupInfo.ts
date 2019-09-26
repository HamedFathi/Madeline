import { TagInfo } from '../../../extractors/comment/TagInfo';
export interface CommentGroupInfo {
    headers: string[] | undefined;
    title: string;
    tags: TagInfo[];
}
