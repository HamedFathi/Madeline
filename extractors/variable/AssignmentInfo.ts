import { TypeInfo } from '../common/TypeInfo';
import { VariableObjectLiteralInfo } from './VariableObjectLiteralInfo';
import { VariableArrayLiteralInfo } from './VariableInitializerInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { CallSignatureInfo } from './CallSignatureInfo';

export interface AssignmentInfo {
    name: string,
    type: TypeInfo | VariableObjectLiteralInfo | VariableArrayLiteralInfo | FunctionInfo | CallSignatureInfo | string | null | undefined;
    isShorthand: boolean;
    isSpread: boolean;
}