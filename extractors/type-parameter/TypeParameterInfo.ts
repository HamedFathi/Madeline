import { TypeInfo } from '../common/TypeInfo';

export interface TypeParameterInfo {
    name: string;
    text: string;
    constraint: TypeInfo | undefined;
}
