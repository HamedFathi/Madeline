import { TypeKind } from './TypeKind';
import { CallSignatureTypeInfo } from './CallSignatureTypeInfo';
import { JsonTypeInfo } from './JsonTypeInfo';

export interface TypeInfo {
    kind: TypeKind;
    kindName: string;
    type: string | string[] | JsonTypeInfo[] | CallSignatureTypeInfo[];
}
