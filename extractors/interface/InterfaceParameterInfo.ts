import { TypeInfo } from '../common/TypeInfo';

export interface InterfaceParameterInfo {
    name: string | undefined;
    type: TypeInfo;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    modifiers: string[] | undefined;
    initializer: string | undefined;
    text: string;
}
