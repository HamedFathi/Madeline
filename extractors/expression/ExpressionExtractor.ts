import { ExpressionStatement, NewExpression, SyntaxKind } from 'ts-morph';
import { ExpressionInfo } from './ExpressionInfo';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';

export class ExpressionExtractor {
    public extract(node: ExpressionStatement): ExpressionInfo {
        let trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        let leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        let exp: ExpressionInfo =
        {
            text: node.getText(),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            modules: new ModuleExtractor().extract(node)
        }
        return exp;
    }
}

