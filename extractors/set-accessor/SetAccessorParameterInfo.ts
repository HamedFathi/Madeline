import { TypeInfo } from '../common/TypeInfo';

export interface SetAccessorParameterInfo {
    name: string;
    modifiers: string[] | undefined;
    type: TypeInfo;
    text: string;
}
