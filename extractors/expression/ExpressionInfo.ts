import { CommentInfo } from '../../dist/es2015/extractors/comment/CommentInfo';
import { TypeParameterInfo } from '../common/TypeParameterInfo';
import { ModuleInfo } from '../module/ModuleInfo';

export interface ExpressionInfo {
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    text: string;
}