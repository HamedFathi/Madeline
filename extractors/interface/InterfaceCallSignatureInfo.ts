import { InterfaceParameterInfo } from './InterfaceParameterInfo';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
export interface InterfaceCallSignatureInfo {
    parameters: InterfaceParameterInfo[] | undefined;
    returnType: TypeInfo;
    text: string;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
}
