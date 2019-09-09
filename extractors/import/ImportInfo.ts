import { ImportKind } from './ImportKind';
export interface ImportInfo {
    name: string;
    alias: string | undefined;
    module: string;
    kind: ImportKind;
    kindName: string;
    text: string;
}
