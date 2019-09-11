import { TypeInfo } from './TypeInfo';
export interface CallSignatureParamTypeInfo {
    type: TypeInfo;
    name: string;
    isOptional: boolean;
}
