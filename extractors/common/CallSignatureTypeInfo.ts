import { TypeInfo } from './TypeInfo';
import { CallSignatureParameterTypeInfo } from './CallSignatureParameterTypeInfo';
export interface CallSignatureTypeInfo {
    returnType: TypeInfo;
    name: string;
    parameters: CallSignatureParameterTypeInfo[] | undefined;
}
