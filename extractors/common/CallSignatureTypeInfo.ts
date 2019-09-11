import { TypeInfo } from './TypeInfo';
import { CallSignatureParamTypeInfo } from './CallSignatureParameterTypeInfo';
export interface CallSignatureTypeInfo {
    returnType: TypeInfo;
    name: string;
    parameters: CallSignatureParamTypeInfo[] | undefined;
}
