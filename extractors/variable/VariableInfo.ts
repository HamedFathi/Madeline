import { LiteralInfo } from '../literal/LiteralInfo';
import { DestructuringInfo } from '../destructuring/DestructuringInfo';
import { CommonVariableInfo } from "./CommonVariableInfo";
export interface VariableInfo {
    literals: LiteralInfo[] | undefined;
    destructions: DestructuringInfo[] | undefined;
    commons: CommonVariableInfo[] | undefined;
}
