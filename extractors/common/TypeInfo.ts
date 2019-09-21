import { TypeDetailInfo } from './TypeDetailInfo';
import { ImportInfo } from '../import/ImportInfo';
/*
export interface TypeInfo {
    text: string;
    fullText: string;
    details: TypeDetailInfo[] | undefined;
    typeNodeText: string | undefined;
}
*/

export interface TypeInfo {
    value: string;
    text: string;
    typeNodeText: string | undefined;
    importedFrom: string[] | undefined;
    typeReference: string | undefined;
    imports: ImportInfo[] | undefined;
}
