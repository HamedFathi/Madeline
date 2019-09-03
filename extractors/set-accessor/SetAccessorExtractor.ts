import { ClassDeclaration, SyntaxKind, SetAccessorDeclaration } from 'ts-morph';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { ExpressionExtractor } from '../expression/ExpressionExtractor';
import { ExpressionInfo } from '../expression/ExpressionInfo';
import { SetAccessorInfo } from './SetAccessorInfo';

export class SetAccessorExtractor {

    private getExpressionStatements(setAccessorDeclaration: SetAccessorDeclaration): undefined | ExpressionInfo[] {
        let result: ExpressionInfo[] = [];
        if (setAccessorDeclaration.getBody()) {
            let expressions = setAccessorDeclaration.getBodyOrThrow().getDescendantsOfKind(SyntaxKind.ExpressionStatement);
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

    public extract(node: ClassDeclaration): SetAccessorInfo[] | undefined {
        let setAccessors = node
            .getSetAccessors()
            .map(x => {
                return {
                    name: x.getName(),
                    parameter: x.getParameters().map(y => {
                        return {
                            name: y.getName(),
                            modifiers: y.getModifiers().length === 0 ? undefined : y.getModifiers().map(z => z.getText()),
                            type: new TypeExtractor().extract(y.getType()),
                        }
                    })[0],
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
        if (setAccessors.length === 0) return undefined;
        return setAccessors;
    }
}


