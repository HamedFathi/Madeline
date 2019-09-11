import { TypeInfo } from './TypeInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
import { CallSignatureParamInfo } from './CallSignatureParameterInfo';

export interface CallSignatureInfo {
    parameters: CallSignatureParamInfo[] | undefined;
    returnType: TypeInfo;
    typeParameters: TypeParameterInfo[] | undefined;
}
