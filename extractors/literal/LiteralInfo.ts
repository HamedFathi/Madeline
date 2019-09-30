import { LiteralExpressionInfo } from './LiteralExpressionInfo';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
export interface LiteralInfo {
    typeReference: string | undefined;
    text: string;
    isArrayLiteral: boolean;
    elements: LiteralExpressionInfo[];
    name: string;
    type: TypeInfo;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
}
