import { MethodParamInfo } from "./MethodParamInfo";
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { VariableInfo } from '../variable/VariableInfo';
import { ExpressionInfo } from '../expression/ExpressionInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
export interface MethodInfo {
    name: string;
    modifiers: string[] | undefined;
    returnType: TypeInfo;
    isGenerator: boolean;
    parameters: MethodParamInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    variables: VariableInfo[][] | undefined;
    expressions: ExpressionInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
}
