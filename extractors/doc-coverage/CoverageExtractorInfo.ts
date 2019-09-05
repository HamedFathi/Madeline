import { SyntaxKind } from 'ts-morph';

export interface CoverageExtractorInfo {
    name: string | undefined;
    kind: SyntaxKind;
    kindName: string;
    hasLeadingComment: boolean;
    hasTrailingComment: boolean;
    hasJsDoc: boolean;
}
