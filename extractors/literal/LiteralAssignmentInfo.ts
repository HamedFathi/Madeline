import { TypeInfo } from '../common/TypeInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { LiteralExpressionInfo } from "./LiteralExpressionInfo";
import { CallSignatureInfo } from '../common/CallSignatureInfo';
export interface LiteralAssignmentInfo {
    name: string;
    value: LiteralExpressionInfo | FunctionInfo | CallSignatureInfo | string | undefined;
    type: TypeInfo;
    isShorthand: boolean;
    isSpread: boolean;
}
