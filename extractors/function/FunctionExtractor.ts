import { FunctionDeclaration, SyntaxKind } from 'ts-morph';
import { FunctionInfo } from './FunctionInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { ExpressionInfo } from '../expression/ExpressionInfo';
import { ExpressionExtractor } from '../expression/ExpressionExtractor';

export class FunctionExtractor {

    private getExpressionStatements(functionDeclaration: FunctionDeclaration): undefined | ExpressionInfo[] {
        let result: ExpressionInfo[] = [];
        if (functionDeclaration.getBody()) {
            let expressions = functionDeclaration.getBodyOrThrow().getDescendantsOfKind(SyntaxKind.ExpressionStatement);
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


    public extract(node: FunctionDeclaration): FunctionInfo {
        let trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        let leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        let typeParameters = node.getTypeParameters().map(y => {
            return {
                name: y.getName(),
                constraint: y.getConstraint() === undefined
                    ? undefined
                    : y.getConstraintOrThrow().getType().getText()
            }
        });
        let returnType = node.getReturnType() === undefined ? undefined : new TypeExtractor().extract(node.getReturnType());
        let variables = node.getVariableStatements().map(x => new VariableExtractor().extract(x));
        let result: FunctionInfo = {
            name: node.getName(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            isGenerator: node.isGenerator(),
            isOverload: node.isOverload(),
            isImplementation: node.isImplementation(),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            modules: new ModuleExtractor().extract(node),
            typeParameters: typeParameters.length === 0 ? undefined : typeParameters,
            returnType: returnType,
            variables: variables.length === 0 ? undefined : variables,
            expressions: this.getExpressionStatements(node),
            parameters: node.getParameters().length === 0 ? undefined : node.getParameters().map(x => {
                return {
                    name: x.getName(),
                    type: new TypeExtractor().extract(x.getType()),
                    modifiers: x.getModifiers().length === 0 ? undefined : x.getModifiers().map(y => y.getText()),
                    isOptional: x.isOptional(),
                    isRest: x.isRestParameter(),
                    isParameterProperty: x.isParameterProperty(),
                    defaultValue: x.getInitializer() === undefined ? undefined : x.getInitializerOrThrow().getText()
                }
            })
        };
        return result;
    }
}

