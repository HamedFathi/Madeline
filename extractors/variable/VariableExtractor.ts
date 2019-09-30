import {
    VariableStatement,
    SyntaxKind,
    Expression,
    FunctionExpression,
    ArrowFunction,
    CallSignatureDeclaration,
    TypeGuards,
} from 'ts-morph';
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
import { ImportInfo } from '../import/ImportInfo';
import { VariableDeclaration } from 'ts-morph';

export class VariableExtractor {
    public getVariableStatementByDeclaration(node: VariableDeclaration): VariableStatement | undefined {
        const declarationList = node.getParent();
        if (declarationList) {
            const statement = declarationList.getParent();
            if (statement && statement.getKind() === SyntaxKind.VariableStatement) {
                const newNode = statement as VariableStatement;
                return newNode;
            }
        }
        return undefined;
    }
    public extract(node: VariableStatement, imports: ImportInfo[] | undefined): VariableInfo {
        const literals = new LiteralExtractor().extract(node, imports);
        const destructions = new DestructuringExtractor().extract(node);
        const commons: CommonVariableInfo[] = [];
        if (!literals && !destructions) {
            const modifiers = node.getModifiers().map(x => x.getText());
            const kind = node.getDeclarationKind();
            const kindName = node.getDeclarationKind().toString();
            const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
            const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
            const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
            const modules = new ModuleExtractor().extract(node);
            const text = node.getText();
            node.getDeclarations().forEach(declaration => {
                const hasTypeReference = declaration.getInitializerIfKind(SyntaxKind.AsExpression) !== void 0;
                let typeReference: string | undefined = void 0;
                if (hasTypeReference) {
                    const asExpression = declaration.getInitializerIfKindOrThrow(SyntaxKind.AsExpression);
                    const typeRef = asExpression.getLastChildIfKind(SyntaxKind.TypeReference);
                    typeReference = typeRef === void 0 ? void 0 : typeRef.getText();
                }
                commons.push({
                    name: declaration.getName(),
                    type: new TypeExtractor().extract(
                        declaration.getType(),
                        declaration.getTypeNode(),
                        typeReference,
                        imports,
                    ),
                    modifiers: modifiers.length === 0 ? void 0 : modifiers,
                    initializer:
                        declaration.getInitializer() === void 0
                            ? void 0
                            : this.getExpressionInfo(declaration.getInitializerOrThrow(), typeReference, imports),
                    kind: kind,
                    kindName: kindName,
                    trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
                    leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
                    hasComment: hasComment,
                    modules: modules,
                    text: text,
                    typeReference: typeReference,
                });
            });
        }
        return {
            literals: literals,
            destructions: destructions,
            commons: commons.length === 0 ? void 0 : commons,
        };
    }

    private getExpressionInfo(
        node: Expression,
        typeReference: string | undefined,
        imports: ImportInfo[] | undefined,
    ): FunctionInfo | CallSignatureInfo | string {
        if (TypeGuards.isFunctionExpression(node)) {
            const functionExpression = node as FunctionExpression;
            const functionDeclarationInfo = new FunctionExtractor().extractFromExpression(functionExpression, imports);
            return functionDeclarationInfo;
        } else if (TypeGuards.isArrowFunction(node)) {
            const arrowFunction = node as ArrowFunction;
            const callSignature = (arrowFunction as unknown) as CallSignatureDeclaration;
            return {
                returnType: new TypeExtractor().extract(
                    callSignature.getReturnType(),
                    callSignature.getReturnTypeNode(),
                    typeReference,
                    imports,
                ),
                typeParameters: new TypeParameterExtractor().extract(callSignature, imports),
                parameters:
                    callSignature.getParameters().length === 0
                        ? void 0
                        : callSignature.getParameters().map(y => {
                              return {
                                  name: y.getName(),
                                  type: new TypeExtractor().extract(
                                      y.getType(),
                                      y.getTypeNode(),
                                      typeReference,
                                      imports,
                                  ),
                                  modifiers:
                                      y.getModifiers().length === 0 ? void 0 : y.getModifiers().map(x => x.getText()),
                                  isOptional: y.isOptional(),
                                  isRest: y.isRestParameter(),
                                  isParameterProperty: y.isParameterProperty(),
                                  initializer:
                                      y.getInitializer() === void 0 ? void 0 : y.getInitializerOrThrow().getText(),
                              };
                          }),
            };
        } else return node.getText();
    }
}
