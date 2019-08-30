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
        let result: ExpressionInfo[] = [];
        if (getAccessorDeclaration.getBody()) {
            let expressions = getAccessorDeclaration.getBodyOrThrow().getDescendantsOfKind(SyntaxKind.ExpressionStatement);
            if (expressions.length === 0) {
                return undefined
            }
            else {
                expressions.forEach(exp => {
                    result.push(new ExpressionExtractor().extract(exp));
                });
                return result;
            }
        }
        return undefined;
    }

    public extract(node: ClassDeclaration): GetAccessorInfo[] | undefined {
        let getAccessors = node
            .getGetAccessors()
            .map(x => {
                return {
                    name: x.getName(),
                    returnType: new TypeExtractor().extract(x.getReturnType()),
                    expressions: this.getExpressionStatements(x),
                    modifiers: x.getModifiers().length === 0 ? undefined : x.getModifiers().map(y => y.getText()),
                    decorators: new DecoratorExtractor().extract(x),
                    trailingComments: new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments: new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                    variables: x.getVariableStatements().map(y => new VariableExtractor().extract(y)).length === 0
                        ? undefined
                        : x.getVariableStatements().map(y => new VariableExtractor().extract(y))

                }
            });
        if (getAccessors.length === 0) return undefined;
        return getAccessors;
    }
}


