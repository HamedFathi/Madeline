/*
import { TypeKind } from './TypeKind';
import { CallSignatureTypeInfo } from './CallSignatureTypeInfo';
import { JsonLikeTypeInfo } from './JsonLikeTypeInfo';

export interface TypeInfo {
    kind: TypeKind;
    kindName: string;
    type: string | string[] | JsonLikeTypeInfo[] | CallSignatureTypeInfo[];
}
*/

export interface TypeInfo {
    importedFrom: string | undefined;
    name: string;
    preType: string | undefined;
    fromNodeModules: string | undefined;
    text: string;
}