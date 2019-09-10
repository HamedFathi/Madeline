import { LiteralExpressionInfo } from './LiteralExpressionInfo';
import { TypeInfo } from '../common/TypeInfo';
export interface LiteralInfo {
    typeReference: string | undefined;
    text: string;
    isArrayLiteral: boolean;
    elements: LiteralExpressionInfo[];
    name: string;
    type: TypeInfo;
}
