import { TagInfo } from '../../extractors/comment/TagInfo';
export interface CommentTemplateInfo {
    description: string[] | undefined;
    headers: string[] | undefined;
    title: string | undefined;
    tags: TagInfo[] | undefined;
    append: boolean;
}
