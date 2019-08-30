import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { VariableInfo } from '../variable/VariableInfo';
import { ExpressionInfo } from '../expression/ExpressionInfo';
export interface GetAccessorInfo {
    name: string;
    returnType: TypeInfo;
    modifiers: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    variables: VariableInfo[][] | undefined;
    expressions: ExpressionInfo[] | undefined;
}
