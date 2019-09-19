import { TypeInfo } from '../common/TypeInfo';

export interface SetAccessorParamInfo {
    name: string;
    modifiers: string[] | undefined;
    type: TypeInfo;
    text: string;
}
