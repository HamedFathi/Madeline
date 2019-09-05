import { SyntaxKind } from 'ts-morph';

export interface CoverageExtractorOption {
    include: SyntaxKind[];
    exclude: SyntaxKind[];
}
