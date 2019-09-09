import { TypeInfo } from '../common/TypeInfo';
import { CallSignatureInfo } from '../variable/CallSignatureInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { LiteralExpressionInfo } from "./LiteralExpressionInfo";
export interface LiteralAssignmentInfo {
    name: string;
    value: LiteralExpressionInfo | FunctionInfo | CallSignatureInfo | string | undefined;
    type: TypeInfo;
    isShorthand: boolean;
    isSpread: boolean;
}
