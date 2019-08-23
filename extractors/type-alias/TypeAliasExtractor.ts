import { TypeAliasDeclaration } from 'ts-morph';
import { TypeAliasInfo } from './TypeAliasInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { NamespaceExtractor } from '../namespace/NamespaceExtractor';

export class TypeAliasExtractor {
    public extract(node: TypeAliasDeclaration): TypeAliasInfo {
        let trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        let leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        return {
            name: node.getName(),
            text: node.getFullText(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            members: new TypeExtractor().extract(node.getType()),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            namespaces: new NamespaceExtractor().extract(node)
        }
    }
}


