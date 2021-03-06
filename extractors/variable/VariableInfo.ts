import { VariableDeclarationKind } from 'ts-morph';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { TypeInfo } from '../common/TypeInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { CallSignatureInfo } from '../common/CallSignatureInfo';
import { TypeCategory } from '../common/TypeCategory';
export interface VariableInfo {
    name: string;
    type: TypeInfo;
    text: string;
    modifiers: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    initializer: FunctionInfo | CallSignatureInfo | string | undefined;
    kind: VariableDeclarationKind;
    kindName: string;
    typeReference: string | undefined;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
    extension: string;
    id: string;
    typeCategory: TypeCategory;
}
