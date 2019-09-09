import { VariableStatement, SyntaxKind, Expression, FunctionExpression, ArrowFunction, CallSignatureDeclaration, TypeGuards } from 'ts-morph';
import { VariableInfo } from './VariableInfo';
import { LiteralExtractor } from '../literal/LiteralExtractor';
import { DestructuringExtractor } from '../destructuring/DestructuringExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypeExtractor } from '../common/TypeExtractor';
import { FunctionInfo } from '../function/FunctionInfo';
import { CallSignatureInfo } from '../common/CallSignatureInfo';
import { FunctionExtractor } from '../function/FunctionExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';
import { CommonVariableInfo } from './CommonVariableInfo';

export class VariableExtractor {
    public extract(node: VariableStatement): VariableInfo {
        let literal = new LiteralExtractor().extract(node);
        let destructuring = new DestructuringExtractor().extract(node);
        let commons: CommonVariableInfo[] = [];
        if (!literal && !destructuring) {
            const modifiers = node.getModifiers().map(x => x.getText());
            const kind = node.getDeclarationKind();
            const kindName = node.getDeclarationKind().toString();
            const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
            const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
            const modules = new ModuleExtractor().extract(node);
            const text = node.getText();
            node.getDeclarations().forEach(declaration => {
                let hasTypeReference = declaration.getInitializerIfKind(SyntaxKind.AsExpression) !== undefined;
                let typeReference: string | undefined = undefined;
                if (hasTypeReference) {
                    let asExpression = declaration.getInitializerIfKindOrThrow(SyntaxKind.AsExpression);
                    let typeRef = asExpression.getLastChildIfKind(SyntaxKind.TypeReference);
                    typeReference = typeRef === undefined ? undefined : typeRef.getText();
                }
                commons.push({
                    name: declaration.getName(),
                    type: new TypeExtractor().extract(declaration.getType()),
                    modifiers: modifiers.length === 0 ? undefined : modifiers,
                    defaultValue:
                        declaration.getInitializer() === undefined
                            ? undefined
                            : this.getExpressionInfo(declaration.getInitializerOrThrow()),
                    kind: kind,
                    kindName: kindName,
                    trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
                    leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
                    modules: modules,
                    text: text,
                    typeReference: typeReference
                });
            });
        }
        return {
            literals: literal,
            destructuring: destructuring,
            commons: commons.length === 0 ? undefined : commons
        }
    }

    private getExpressionInfo(node: Expression): FunctionInfo | CallSignatureInfo | string {
        if (TypeGuards.isFunctionExpression(node)) {
            const functionExpression = node as FunctionExpression;
            const functionDeclarationInfo = new FunctionExtractor().extractFromExpression(functionExpression);
            return functionDeclarationInfo;
        } else if (TypeGuards.isArrowFunction(node)) {
            const arrowFunction = node as ArrowFunction;
            const callSignature = arrowFunction as unknown as CallSignatureDeclaration;
            return {
                returnType: new TypeExtractor().extract(callSignature.getReturnType()),
                typeParameters: new TypeParameterExtractor().extract(callSignature),
                parameters:
                    callSignature.getParameters().length === 0
                        ? undefined
                        : callSignature.getParameters().map(y => {
                            return {
                                name: y.getName(),
                                type: new TypeExtractor().extract(y.getType()),
                                modifiers:
                                    y.getModifiers().length === 0
                                        ? undefined
                                        : y.getModifiers().map(x => x.getText()),
                                isOptional: y.isOptional(),
                                isRest: y.isRestParameter(),
                                isParameterProperty: y.isParameterProperty(),
                                defaultValue:
                                    y.getInitializer() === undefined
                                        ? undefined
                                        : y.getInitializerOrThrow().getText(),
                            };
                        }),
            };
        }
        else
            return node.getText();
    }
}

