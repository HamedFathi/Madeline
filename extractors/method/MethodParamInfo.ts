import { TypeInfo } from '../common/TypeInfo';

export interface MethodParamInfo {
    name: string;
    type: TypeInfo;
    modifiers: string[] | undefined;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    defaultValue: string | undefined;
}
