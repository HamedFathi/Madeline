import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ExportAssignmentInfo } from './ExportAssignmentInfo';
import { ExportAssignment, SyntaxKind, SourceFile } from 'ts-morph';
export class ExportAssignmentExtractor {
    public extract(sourceFile: SourceFile): ExportAssignmentInfo[] | undefined {
        let result: ExportAssignmentInfo[] = [];
        sourceFile.forEachDescendant(node => {
            switch (node.getKind()) {
                case SyntaxKind.ExportAssignment:
                    let x = <ExportAssignment>node;
                    let trailingComments = new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges());
                    let leadingComments = new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges());
                    let expression: ExportAssignmentInfo =
                    {
                        text: x.getText(),
                        trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
                        leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
                        modules: new ModuleExtractor().extract(x)
                    }
                    result.push(expression);
                    break;

            }
        });
        return result.length === 0 ? undefined : result;
    }
}

