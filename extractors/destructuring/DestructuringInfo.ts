import { DestructuringElementInfo } from "./DestructuringElementInfo";
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { VariableDeclarationKind } from 'ts-morph';
export interface DestructuringInfo {
    isArrayDestructuring: boolean;
    elements: DestructuringElementInfo[];
    defaultValue: string | undefined;
    modifiers: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    kind: VariableDeclarationKind;
    kindName: string;
    typeReference: string | undefined;
}
