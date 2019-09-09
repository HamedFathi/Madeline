import { TypeInfo } from '../common/TypeInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
import { CallSignatureParamInfo } from './CallSignatureParamInfo';

export interface CallSignatureInfo {
    parameters: CallSignatureParamInfo[] | undefined;
    returnType: TypeInfo;
    typeParameters: TypeParameterInfo[] | undefined;
}
