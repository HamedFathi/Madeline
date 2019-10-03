import { FromTypeInfo } from './FromTypeInfo';
import { TypeScope } from './TypeScope';

export interface TypeInfo {
    value: string;
    text: string;
    typeNodeText: string | undefined;
    typeReference: string | undefined;
    from: FromTypeInfo[] | undefined;
    typeScope: TypeScope;
}
