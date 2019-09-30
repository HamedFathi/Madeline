import { EnumMember } from './EnumMember';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';

export interface EnumInfo {
    name: string;
    modifiers: string[] | undefined;
    members: EnumMember[];
    isConst: boolean;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    text: string;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
}
