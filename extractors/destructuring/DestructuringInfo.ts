import { DestructuringElementInfo } from './DestructuringElementInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { VariableDeclarationKind } from 'ts-morph';
export interface DestructuringInfo {
    isArrayDestructuring: boolean;
    elements: DestructuringElementInfo[];
    initializer: string | undefined;
    modifiers: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    kind: VariableDeclarationKind;
    kindName: string;
    typeReference: string | undefined;
    text: string;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
    id: string;
}
