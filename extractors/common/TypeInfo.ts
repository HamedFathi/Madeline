import { TypeImportInfo } from './TypeImportInfo';

export interface TypeInfo {
    value: string;
    text: string;
    typeNodeText: string | undefined;
    importedFrom: string[] | undefined;
    typeReference: string | undefined;
    imports: TypeImportInfo[] | undefined;
    from: string[] | undefined;
}
