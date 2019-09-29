import { NamedExportInfo } from './NamedExportInfo';
import { CommentInfo } from '../comment/CommentInfo';
export interface ExportInfo {
    moduleSpecifier: string | undefined;
    namedExports: NamedExportInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    hasComment: boolean;
    text: string;
    hasAsterisk: boolean;
}
