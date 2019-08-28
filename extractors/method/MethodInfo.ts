import { MethodParamInfo } from "./MethodParamInfo";
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { VariableInfo } from '../variable/VariableInfo';
export interface MethodInfo {
    name: string;
    modifiers: string[] | undefined;
    returnType: TypeInfo;
    isGenerator: boolean;
    parameters: MethodParamInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    variables: VariableInfo[][] | undefined;
}
