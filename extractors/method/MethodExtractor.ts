import { ClassDeclaration, MethodDeclaration, SyntaxKind } from 'ts-morph';
import { MethodInfo } from './MethodInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { ExpressionInfo } from '../expression/ExpressionInfo';
import { ExpressionExtractor } from '../expression/ExpressionExtractor';

export class MethodExtractor {
    private getExpressionStatements(methodDeclaration: MethodDeclaration): undefined | ExpressionInfo[] {
        const result: ExpressionInfo[] = [];
        if (methodDeclaration.getBody()) {
            const expressions = methodDeclaration.getBodyOrThrow().getDescendantsOfKind(SyntaxKind.ExpressionStatement);
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
    public extract(node: MethodDeclaration): MethodInfo {
        return {
            name: node.getName(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(y => y.getText()),
            returnType: new TypeExtractor().extract(node.getReturnType()),
            isGenerator: node.isGenerator(),
            trailingComments:
                new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()),
            leadingComments:
                new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()),
            decorators: new DecoratorExtractor().extract(node),
            variables:
                node.getVariableStatements().map(y => new VariableExtractor().extract(y)).length === 0
                    ? undefined
                    : node.getVariableStatements().map(y => new VariableExtractor().extract(y)),
            parameters:
                node.getParameters().length === 0
                    ? undefined
                    : node.getParameters().map(y => {
                          return {
                              name: y.getName(),
                              type: new TypeExtractor().extract(y.getType()),
                              isOptional: y.isOptional(),
                              isRest: y.isRestParameter(),
                              isParameterProperty: y.isParameterProperty(),
                              modifiers:
                                  y.getModifiers().length === 0 ? undefined : y.getModifiers().map(x => x.getText()),
                              defaultValue:
                                  y.getInitializer() === undefined ? undefined : y.getInitializerOrThrow().getText(),
                              decorators: new DecoratorExtractor().extract(y),
                          };
                      }),
            expressions: this.getExpressionStatements(node),
        };
    }

    public extractFromClass(node: ClassDeclaration): MethodInfo[] | undefined {
        const methods = node.getMethods().map(x => this.extract(x));
        if (methods.length === 0) return undefined;
        return methods;
    }
}
