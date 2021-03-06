import { TypeCategory } from './../common/TypeCategory';
import { LiteralExpressionInfo } from './LiteralExpressionInfo';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
export interface LiteralInfo {
    typeReference: string | undefined;
    text: string;
    isArrayLiteral: boolean;
    modules: ModuleInfo[] | undefined;
    elements: LiteralExpressionInfo[];
    name: string;
    type: TypeInfo;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
    extension: string;
    id: string;
    typeCategory: TypeCategory;
}
