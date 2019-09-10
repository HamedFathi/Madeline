import { TypeAliasDeclaration } from 'ts-morph';
import { TypeAliasInfo } from './TypeAliasInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';

export class TypeAliasExtractor {
    public extract(node: TypeAliasDeclaration): TypeAliasInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        return {
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            members: new TypeExtractor().extract(node.getType()),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            modules: new ModuleExtractor().extract(node),
        };
    }
}
