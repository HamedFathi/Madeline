import { FunctionParamInfo } from "./FunctionParamInfo";
import { CommentInfo } from '../comment/CommentInfo';
import { NamespaceInfo } from '../namespace/NamespaceInfo';
import { TypeParameterInfo } from '../common/TypeParameterInfo';
import { TypeInfo } from '../common/TypeInfo';
export interface FunctionInfo {
    name: string | undefined;
    modifiers: string[] | undefined;
    isGenerator: boolean;
    isOverload: boolean;
    isImplementation: boolean;
    returnType : TypeInfo | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    namespaces: NamespaceInfo[] | undefined;
    parameters: FunctionParamInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;

}
