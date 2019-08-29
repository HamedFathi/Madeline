import { FunctionParamInfo } from "./FunctionParamInfo";
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { TypeParameterInfo } from '../common/TypeParameterInfo';
import { TypeInfo } from '../common/TypeInfo';
import { VariableInfo } from '../variable/VariableInfo';
export interface FunctionInfo {
    name: string | undefined;
    modifiers: string[] | undefined;
    isGenerator: boolean;
    isOverload: boolean;
    isImplementation: boolean;
    returnType : TypeInfo | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    parameters: FunctionParamInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
    variables: VariableInfo[][] | undefined;
}
