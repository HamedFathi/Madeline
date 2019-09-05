import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ExportAssignmentInfo } from './ExportAssignmentInfo';
import { ExportAssignment, SyntaxKind, SourceFile } from 'ts-morph';
export class ExportAssignmentExtractor {
    public extract(sourceFile: SourceFile): ExportAssignmentInfo[] | undefined {
        const result: ExportAssignmentInfo[] = [];
        sourceFile.forEachDescendant(node => {
            switch (node.getKind()) {
                case SyntaxKind.ExportAssignment:
                    const x = <ExportAssignment>node;
                    const isExportDefault = !x.isExportEquals();
                    const trailingComments = new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges());
                    const leadingComments = new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges());
                    const expression: ExportAssignmentInfo = {
                        text: x.getText(),
                        trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
                        leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
                        modules: new ModuleExtractor().extract(x),
                        isExportDefault: isExportDefault,
                    };
                    result.push(expression);
                    break;
            }
        });
        return result.length === 0 ? undefined : result;
    }
}
