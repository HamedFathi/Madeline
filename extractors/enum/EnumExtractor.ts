import { EnumDeclaration } from 'ts-morph';
import { EnumInfo } from './EnumInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';

export class EnumExtractor {
    public extract(node: EnumDeclaration): EnumInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        return {
            name: node.getName(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            isConst: node.isConstEnum(),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            modules: new ModuleExtractor().extract(node),
            text: node.getText(),
            members: node.getMembers().map(x => {
                return {
                    name: x.getName(),
                    value: x.getValue(),
                    text: x.getText(),
                    trailingComments:
                        new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                            ? undefined
                            : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments:
                        new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                            ? undefined
                            : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                };
            }),
        };
    }
}
