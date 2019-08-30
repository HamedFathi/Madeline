import { VariableDeclarationKind } from 'ts-morph';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
export interface VariableInfo {
    name: string;
    type: TypeInfo;
    modifiers: string[] | undefined;
    kind: VariableDeclarationKind;
    kindName: string;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    value: string | undefined;
}
