import { ImportKind } from './ImportKind';
export interface ImportInfo {
    name: string;
    alias: string | undefined;
    module: string;
    kind: ImportKind;
    kindName: string;
    text: string;
    path: string;
    file: string;
    directory: string;
    id: string;
    extension: string;
}
