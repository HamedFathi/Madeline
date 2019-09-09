import { InterfaceParamInfo } from './InterfaceParamInfo';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';

export interface InterfaceMethodInfo {
    name: string | undefined;
    parameters: InterfaceParamInfo[] | undefined;
    returnType: TypeInfo;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
}
