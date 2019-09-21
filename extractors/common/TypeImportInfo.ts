import { ImportKind } from '../import/ImportKind';
export interface TypeImportInfo {
    name: string;
    alias: string | undefined;
    module: string;
    kind: ImportKind;
    kindName: string;
    text: string;
    isThirdParty: boolean;
}
