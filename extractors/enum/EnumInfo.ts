import { EnumMember } from './EnumMember';
import { CommentInfo } from '../comment/CommentInfo';
import { NamespaceInfo } from '../namespace/NamespaceInfo';

export interface EnumInfo {
    name: string;
    modifiers: string[] | undefined,
    members: EnumMember[];
    isConst: boolean;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    namespaces: NamespaceInfo[] | undefined;
}
