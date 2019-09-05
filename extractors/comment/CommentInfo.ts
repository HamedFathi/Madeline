import { TagInfo } from './TagInfo';
import { CommentKind } from './CommentKind';

export interface CommentInfo {
    text: string | undefined;
    kind: CommentKind;
    kindName: string;
    description: string[] | undefined;
    tags: TagInfo[] | undefined;
}
