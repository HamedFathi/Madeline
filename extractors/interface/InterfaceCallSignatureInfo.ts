import { InterfaceParamInfo } from './InterfaceParamInfo';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { TypeParameterInfo } from '../common/TypeParameterInfo';
export interface InterfaceCallSignatureInfo {
    parameters: InterfaceParamInfo[] | undefined;
    returnType: TypeInfo;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;

}
