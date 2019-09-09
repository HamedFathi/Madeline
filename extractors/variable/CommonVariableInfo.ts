import { VariableDeclarationKind } from 'ts-morph';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { TypeInfo } from '../common/TypeInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { CallSignatureInfo } from '../common/CallSignatureInfo';
export interface CommonVariableInfo {
    name: string;
    type: TypeInfo;
    text: string;
    modifiers: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    defaultValue: FunctionInfo | CallSignatureInfo | string | undefined;
    kind: VariableDeclarationKind;
    kindName: string;
    typeReference: string | undefined;
}
