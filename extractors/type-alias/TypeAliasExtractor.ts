import { TypeAliasDeclaration } from 'ts-morph';
import { TypeAliasInfo } from './TypeAliasInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';

export class TypeAliasExtractor {
    public extract(node: TypeAliasDeclaration): TypeAliasInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        return {
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(x => x.getText()),
            initializer: node.getTypeNode() === void 0 ? '' : node.getTypeNodeOrThrow().getText(),
            type: new TypeExtractor().extract(node.getType(), node.getTypeNode(), void 0),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            modules: new ModuleExtractor().extract(node),
            typeParameters: new TypeParameterExtractor().extract(node),
            hasComment: hasComment,
        };
    }
}
