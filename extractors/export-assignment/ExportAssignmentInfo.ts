import { ModuleInfo } from '../module/ModuleInfo';
import { CommentInfo } from '../comment/CommentInfo';

export interface ExportAssignmentInfo {
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    text: string;
}