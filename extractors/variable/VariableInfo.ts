import { VariableDeclarationKind } from 'ts-morph';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
export interface VariableInfo {
    name: string;
    type: TypeInfo;
    modifiers: string[] | undefined;
    kind: VariableDeclarationKind;
    kindName: string;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
}
