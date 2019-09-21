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
    text: string;
    typeNodeText?: string;
    importedFrom?: string[];
    typeReference?: string;
}
