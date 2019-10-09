import { TypeInfo } from './TypeInfo';
import { CallSignatureParameterInfo } from './CallSignatureParameterInfo';
export interface CallSignatureTypeInfo {
    returnType: TypeInfo;
    name: string;
    parameters: CallSignatureParameterInfo[] | undefined;
}
