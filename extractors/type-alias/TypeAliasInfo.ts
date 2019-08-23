import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { NamespaceInfo } from '../namespace/NamespaceInfo';

export interface TypeAliasInfo {
    name: string;
    text: string;
    modifiers: string[] | undefined;
    members: TypeInfo;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    namespaces: NamespaceInfo[] | undefined;
}
