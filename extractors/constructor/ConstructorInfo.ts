import { ConstructorParamInfo } from './ConstructorParameterInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { VariableInfo } from '../variable/VariableInfo';
export interface ConstructorInfo {
    isParameterLess: boolean;
    isImplementation: boolean;
    isOverload: boolean;
    modifiers: string[] | undefined;
    parameters: ConstructorParamInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    variables: VariableInfo[] | undefined;
    text: string;
}
