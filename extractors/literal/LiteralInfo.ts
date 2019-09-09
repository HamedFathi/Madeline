import { LiteralExpressionInfo } from "./LiteralExpressionInfo";
export interface LiteralInfo {
    typeReference: string | undefined;
    text: string;
    isArrayLiteral: boolean;
    elements: LiteralExpressionInfo[];
}
