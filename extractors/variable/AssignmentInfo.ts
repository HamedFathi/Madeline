import { TypeInfo } from '../common/TypeInfo';
import { VariableObjectLiteralInfo } from './VariableObjectLiteralInfo';
import { VariableArrayLiteralInfo } from './VariableArrayLiteralInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { CallSignatureInfo } from './CallSignatureInfo';

export interface AssignmentInfo  {
    name: string,
    value: VariableObjectLiteralInfo | VariableArrayLiteralInfo | FunctionInfo | CallSignatureInfo | string | null | undefined;
    type: TypeInfo;
    isShorthand: boolean;
    isSpread: boolean;
}