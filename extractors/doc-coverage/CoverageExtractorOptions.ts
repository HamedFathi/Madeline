import { SyntaxKind } from 'ts-morph';

export interface CoverageExtractorOptions {
    include: SyntaxKind[];
    exclude: SyntaxKind[];
}
