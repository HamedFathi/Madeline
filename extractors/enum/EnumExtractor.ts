import { EnumDeclaration } from 'ts-morph';
import { EnumInfo } from './EnumInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { PathUtils } from '../../utilities/PathUtils';

export class EnumExtractor {
    constructor(private pathUtils: PathUtils = new PathUtils()) {}

    public extract(node: EnumDeclaration): EnumInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const pathInfo = this.pathUtils.getPathInfo(node.getSourceFile().getFilePath());
        return {
            name: node.getName(),
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(x => x.getText()),
            isConst: node.isConstEnum(),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            modules: new ModuleExtractor().extract(node),
            text: node.getText(),
            hasComment: hasComment,
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
            members: node.getMembers().map(x => {
                return {
                    name: x.getName(),
                    value: x.getValue(),
                    text: x.getText(),
                    hasComment:
                        new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length !== 0 ||
                        new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length !== 0,
                    trailingComments:
                        new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                            ? void 0
                            : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments:
                        new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                            ? void 0
                            : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                };
            }),
        };
    }
}
