import { TypeInfo } from './TypeInfo';
export interface CallSignatureParamInfo {
    name: string | undefined;
    type: TypeInfo;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    modifiers: string[] | undefined;
    defaultValue: string | undefined;
}
