import { TypeInfo } from './TypeInfo';
export interface CallSignatureParameterTypeInfo {
    type: TypeInfo;
    name: string;
    isOptional: boolean;
}
