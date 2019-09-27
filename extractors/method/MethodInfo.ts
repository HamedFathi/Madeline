import { MethodParamInfo } from './MethodParameterInfo';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { VariableInfo } from '../variable/VariableInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
export interface MethodInfo {
    name: string;
    text: string;
    modifiers: string[] | undefined;
    returnType: TypeInfo;
    isGenerator: boolean;
    parameters: MethodParamInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    variables: VariableInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
    hasComment: boolean;
}
