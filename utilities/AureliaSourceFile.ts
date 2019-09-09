import { SourceFile } from 'ts-morph';
export interface AureliaSourceFile {
    name: string;
    directory: string;
    sourceFiles: SourceFile[];
}
