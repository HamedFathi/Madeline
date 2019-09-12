import { CommentInfo } from '../comment/CommentInfo';

export interface ModuleInfo {
    isNamespace: boolean;
    modifiers: string[] | undefined;
    name: string;
    text: string;
    level: number;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
}
