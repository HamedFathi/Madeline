import { TypeInfo } from './TypeInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
import { CallSignatureParameterInfo } from './CallSignatureParameterInfo';

export interface CallSignatureInfo {
    parameters: CallSignatureParameterInfo[] | undefined;
    returnType: TypeInfo;
    typeParameters: TypeParameterInfo[] | undefined;
}
