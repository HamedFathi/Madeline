import { TypeInfo } from '../common/TypeInfo';

export interface InterfaceParamInfo {
    name: string | undefined;
    type: TypeInfo;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    modifiers:string[] | undefined;
}

