import { ClassDeclaration, GetAccessorDeclaration, SyntaxKind } from 'ts-morph';
import { GetAccessorInfo } from './GetAccessorInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { ExpressionExtractor } from '../expression/ExpressionExtractor';
import { ExpressionInfo } from '../expression/ExpressionInfo';

export class GetAccessorExtractor {
    private getExpressionStatements(getAccessorDeclaration: GetAccessorDeclaration): undefined | ExpressionInfo[] {
        const result: ExpressionInfo[] = [];
        if (getAccessorDeclaration.getBody()) {
            const expressions = getAccessorDeclaration
                .getBodyOrThrow()
                .getDescendantsOfKind(SyntaxKind.ExpressionStatement);
            if (expressions.length === 0) {
                return undefined;
            } else {
                expressions.forEach(exp => {
                    result.push(new ExpressionExtractor().extract(exp));
                });
                return result;
            }
        }
        return undefined;
    }

    public extract(node: GetAccessorDeclaration): GetAccessorInfo {
        return {
            name: node.getName(),
            returnType: new TypeExtractor().extract(node.getReturnType()),
            expressions: this.getExpressionStatements(node),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(y => y.getText()),
            decorators: new DecoratorExtractor().extract(node),
            trailingComments:
                new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()),
            leadingComments:
                new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()),
            variables:
                node.getVariableStatements().map(y => new VariableExtractor().extract(y)).length === 0
                    ? undefined
                    : node.getVariableStatements().map(y => new VariableExtractor().extract(y)),
        };
    }

    public extractFromClass(node: ClassDeclaration): GetAccessorInfo[] | undefined {
        const getAccessors = node.getGetAccessors().map(x => this.extract(x));
        if (getAccessors.length === 0) return undefined;
        return getAccessors;
    }
}
