import { ConstructorParamInfo } from './ConstructorParamInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { VariableInfo } from '../variable/VariableInfo';
import { ExpressionInfo } from '../expression/ExpressionInfo';
export interface ConstructorInfo {
    isParameterLess: boolean;
    isImplementation: boolean;
    isOverload: boolean;
    modifiers: string[] | undefined;
    parameters: ConstructorParamInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    variables: VariableInfo[][] | undefined;
    expressions: ExpressionInfo[] | undefined;
}
