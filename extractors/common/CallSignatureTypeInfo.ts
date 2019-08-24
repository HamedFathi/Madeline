import { TypeInfo } from "./TypeInfo";
import { CallSignatureParamTypeInfo } from './CallSignatureParamTypeInfo';
export interface CallSignatureTypeInfo {
    returnType: TypeInfo;
    name: string;
    parameters: CallSignatureParamTypeInfo[] | undefined;
}
