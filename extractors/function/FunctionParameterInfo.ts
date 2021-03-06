import { TypeInfo } from '../common/TypeInfo';

export interface FunctionParameterInfo {
    name: string;
    modifiers: string[] | undefined;
    type: TypeInfo;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    initializer: string | undefined;
    text: string;
}
