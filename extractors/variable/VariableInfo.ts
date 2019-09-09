import { LiteralInfo } from '../literal/LiteralInfo';
import { DestructuringInfo } from '../destructuring/DestructuringInfo';
import { CommonVariableInfo } from "./CommonVariableInfo";
export interface VariableInfo {
    literals: LiteralInfo[] | undefined;
    destructuring: DestructuringInfo[] | undefined;
    commons: CommonVariableInfo[] | undefined;
}
