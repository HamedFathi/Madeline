import { TypeInfo } from '../common/TypeInfo';

export interface TypeParameterInfo {
    name: string;
    text: string;
    constraint: TypeInfo | undefined;
    path: string;
    file: string;
    directory: string;
    id: string;
    extension: string;
}
