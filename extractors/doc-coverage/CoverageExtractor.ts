import { JSDoc, SourceFile, SyntaxKind } from 'ts-morph';
import { CoverageExtractorOptions } from './CoverageExtractorOptions';
import { CoverageExtractorInfo } from './CoverageExtractorInfo';

// TODO: support exportable node only. export class ,...
export class CoverageExtractor {
    public extract(sourceFile: SourceFile, options?: CoverageExtractorOptions): CoverageExtractorInfo[] {
        let valid = [
            SyntaxKind.ClassDeclaration,
            SyntaxKind.MethodDeclaration,
            SyntaxKind.PropertyDeclaration,
            SyntaxKind.InterfaceDeclaration,
            SyntaxKind.EnumDeclaration,
            SyntaxKind.FunctionDeclaration,
            SyntaxKind.GetAccessor,
            SyntaxKind.SetAccessor,
            SyntaxKind.ExportAssignment,
            SyntaxKind.TypeAliasDeclaration,
            /*SyntaxKind.VariableStatement*/
        ];
        let invalid: SyntaxKind[] = [];
        const result: CoverageExtractorInfo[] = [];
        if (options) {
            valid = options.include;
            invalid = options.exclude;
        }
        sourceFile.forEachDescendant(node => {
            if (valid.includes(node.getKind()) && !invalid.includes(node.getKind())) {
                let name = '';
                /* eslint-disable */
                //@ts-ignore
                if (typeof node.getName !== 'undefined') {
                    //@ts-ignore
                    name = node.getName();
                }
                /* eslint-disable */
                const kind = node.getKind();
                const kindName = node.getKindName();
                const hasLeadingComment = node.getLeadingCommentRanges().length > 0;
                const hasTrailingComment = node.getTrailingCommentRanges().length > 0;
                let hasJsDoc = false;
                /* eslint-disable */
                //@ts-ignore
                if (typeof node.getJsDocs !== 'undefined') {
                    //@ts-ignore
                    hasJsDoc = (node.getJsDocs() as JSDoc[]).length > 0;
                }
                /* eslint-disable */
                result.push({
                    name: name,
                    kind: kind,
                    kindName: kindName,
                    hasLeadingComment: hasLeadingComment,
                    hasTrailingComment: hasTrailingComment,
                    hasJsDoc: hasJsDoc,
                });
            }
        });
        return result;
    }
}
