import { VariableDeclarationKind } from 'ts-morph';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { VariableObjectLiteralInfo } from './VariableObjectLiteralInfo';
import { VariableArrayLiteralInfo } from './VariableArrayLiteralInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { CallSignatureInfo } from './CallSignatureInfo';
export interface VariableInfo {
    name: string;
    type: TypeInfo;
    modifiers: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    value: VariableObjectLiteralInfo | VariableArrayLiteralInfo | FunctionInfo | CallSignatureInfo | string | undefined;
    hasAsExpression: boolean;
    kind: VariableDeclarationKind;
    kindName: string;
}
