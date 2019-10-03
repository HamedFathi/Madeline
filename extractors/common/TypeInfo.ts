import { FromTypeInfo } from './FromTypeInfo';

export interface TypeInfo {
    value: string;
    text: string;
    typeNodeText: string | undefined;
    typeReference: string | undefined;
    from: FromTypeInfo[] | undefined;
}
