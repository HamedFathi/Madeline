import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ExportAssignmentInfo } from './ExportAssignmentInfo';
import { ExportAssignment, SyntaxKind, SourceFile } from 'ts-morph';
import { PathUtils } from '../../utilities/PathUtils';
import { HashUtils } from '../../utilities/HashUtils';
export class ExportAssignmentExtractor {
    constructor(private pathUtils: PathUtils = new PathUtils(), private hashUtils: HashUtils = new HashUtils()) {}

    public extract(sourceFile: SourceFile): ExportAssignmentInfo[] | undefined {
        const result: ExportAssignmentInfo[] = [];
        sourceFile.forEachDescendant(node => {
            switch (node.getKind()) {
                case SyntaxKind.ExportAssignment:
                    const x = node as ExportAssignment;
                    const pathInfo = this.pathUtils.getPathInfo(node.getSourceFile().getFilePath());
                    const isExportDefault = !x.isExportEquals();
                    const trailingComments = new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges());
                    const leadingComments = new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges());
                    const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
                    const expression: ExportAssignmentInfo = {
                        id: this.hashUtils.getSha256(node.getText()),
                        text: x.getText(),
                        hasComment: hasComment,
                        path: pathInfo.path,
                        directory: pathInfo.directory,
                        file: pathInfo.file,
                        trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
                        leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
                        modules: new ModuleExtractor().extract(x),
                        isExportDefault: isExportDefault,
                    };
                    result.push(expression);
                    break;
            }
        });
        return result.length === 0 ? void 0 : result;
    }
}
