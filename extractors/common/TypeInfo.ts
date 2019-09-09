import { TypeKind } from './TypeKind';
import { CallSignatureTypeInfo } from './CallSignatureTypeInfo';
import { JsonLikeTypeInfo } from './JsonLikeTypeInfo';

export interface TypeInfo {
    kind: TypeKind;
    kindName: string;
    type: string | string[] | JsonLikeTypeInfo[] | CallSignatureTypeInfo[];
}
