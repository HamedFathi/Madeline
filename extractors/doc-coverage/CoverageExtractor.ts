import { JSDoc, SourceFile, SyntaxKind } from "ts-morph";
import { CoverageExtractorOption } from "./CoverageExtractorOption";
import { CoverageExtractorInfo } from './CoverageExtractorInfo';

export class CoverageExtractor {
    public extract(sourceFile: SourceFile, option?: CoverageExtractorOption): CoverageExtractorInfo[] {
        let valid = [
            SyntaxKind.ClassDeclaration,
            SyntaxKind.MethodDeclaration,
            SyntaxKind.PropertyDeclaration,
            SyntaxKind.InterfaceDeclaration,
            SyntaxKind.EnumDeclaration,
            SyntaxKind.FunctionDeclaration
        ];
        let invalid: SyntaxKind[] = [];
        let result: CoverageExtractorInfo[] = [];
        if (option) {
            valid = option.include;
            invalid = option.exclude;
        }
        sourceFile.forEachDescendant(node => {
            if (valid.includes(node.getKind()) && !invalid.includes(node.getKind())) {
                let name = "";
                //@ts-ignore
                if (typeof node.getName !== 'undefined') {
                    //@ts-ignore
                    name = node.getName();
                }
                let kind = node.getKind();
                let kindName = node.getKindName();
                let hasLeadingComment = node.getLeadingCommentRanges().length > 0;
                let hasTrailingComment = node.getTrailingCommentRanges().length > 0;
                let hasJsDoc = false;
                //@ts-ignore
                if (typeof node.getJsDocs !== 'undefined') {
                    //@ts-ignore
                    hasJsDoc = (<JSDoc[]>node.getJsDocs()).length > 0;
                }
                result.push({
                    name: name,
                    kind: kind,
                    kindName: kindName,
                    hasLeadingComment: hasLeadingComment,
                    hasTrailingComment: hasTrailingComment,
                    hasJsDoc: hasJsDoc
                });
            }
        });
        return result;
    }
}

