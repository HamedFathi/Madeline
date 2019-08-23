import { TypeInfo } from "./TypeInfo";
export interface CallSignatureParamTypeInfo {
    type: TypeInfo | undefined;
    name: string;
    isOptional: boolean;
}
