import { CommentInfo } from '../comment/CommentInfo';

export interface EnumMember {
    name: string;
    value: string | number | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    text: string;
    hasComment: boolean;
}
