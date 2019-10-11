import { ModuleInfo } from '../module/ModuleInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { TypeCategory } from '../common/TypeCategory';

export interface ExportAssignmentInfo {
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    text: string;
    isExportDefault: boolean;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
    extension: string;
    id: string;
    typeCategory: TypeCategory;
}
