import { CommentInfo } from '../comment/CommentInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { VariableInfo } from '../variable/VariableInfo';
import { ExpressionInfo } from '../expression/ExpressionInfo';
import { SetAccessorParamInfo } from './SetAccessorParamInfo';
export interface SetAccessorInfo {
    name: string;
    parameter: SetAccessorParamInfo;
    modifiers: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    variables: VariableInfo[] | undefined;
    expressions: ExpressionInfo[] | undefined;
}
