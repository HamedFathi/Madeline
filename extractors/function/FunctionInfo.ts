import { FunctionParamInfo } from "./FunctionParamInfo";
import { CommentInfo } from '../comment/CommentInfo';
import { NamespaceInfo } from '../namespace/NamespaceInfo';
export interface FunctionInfo {
    name: string | undefined;
    modifiers: string[] | undefined;
    isGenerator: boolean;
    isOverload: boolean;
    isImplementation: boolean;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    namespaces: NamespaceInfo[] | undefined;
    params: FunctionParamInfo[] | undefined;
}
