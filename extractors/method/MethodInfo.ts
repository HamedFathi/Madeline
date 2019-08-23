import { MethodParamInfo } from "./MethodParamInfo";
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
export interface MethodInfo {
    name: string;
    modifiers: string[] | undefined;
    returnType: TypeInfo;
    isGenerator: boolean;
    params: MethodParamInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
}
