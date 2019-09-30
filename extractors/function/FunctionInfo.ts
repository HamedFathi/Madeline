import { FunctionParamInfo } from './FunctionParameterInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
import { TypeInfo } from '../common/TypeInfo';
import { VariableInfo } from '../variable/VariableInfo';
export interface FunctionInfo {
    name: string | undefined;
    modifiers: string[] | undefined;
    isGenerator: boolean;
    isOverload?: boolean;
    isImplementation?: boolean;
    returnType: TypeInfo | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules?: ModuleInfo[] | undefined;
    parameters: FunctionParamInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
    variables: VariableInfo[] | undefined;
    text: string;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
}
