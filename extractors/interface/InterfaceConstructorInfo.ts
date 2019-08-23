import { InterfaceParamInfo } from './InterfaceParamInfo';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';

export interface InterfaceConstructorInfo {
    params: InterfaceParamInfo[] | undefined;
    returnType: TypeInfo;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
}
