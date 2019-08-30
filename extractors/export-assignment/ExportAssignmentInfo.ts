import { CommentInfo } from '../../dist/es2015/extractors/comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';

export interface ExportAssignmentInfo {
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    text: string;
}