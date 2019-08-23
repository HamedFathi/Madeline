import { TypeInfo } from '../common/TypeInfo';

export interface FunctionParamInfo {
    name: string;
    modifiers: string[] | undefined;
    type: TypeInfo;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    defaultValue: string | undefined;
}
