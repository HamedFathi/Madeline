import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';

export interface InterfacePropertyInfo {
    name: string | undefined;
    type: TypeInfo;
    isOptional: boolean;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
}
