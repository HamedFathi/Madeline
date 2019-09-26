import { ClassDeclaration, MethodDeclaration } from 'ts-morph';
import { MethodInfo } from './MethodInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';

export class MethodExtractor {
    public extract(node: MethodDeclaration): MethodInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        return {
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(y => y.getText()),
            returnType: new TypeExtractor().extract(node.getReturnType(), node.getReturnTypeNode(), undefined),
            isGenerator: node.isGenerator(),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            hasComment: hasComment,
            decorators: new DecoratorExtractor().extract(node),
            typeParameters: new TypeParameterExtractor().extract(node),
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
                            text: y.getText(),
                            type: new TypeExtractor().extract(y.getType(), y.getTypeNode(), undefined),
                            isOptional: y.isOptional(),
                            isRest: y.isRestParameter(),
                            isParameterProperty: y.isParameterProperty(),
                            modifiers:
                                y.getModifiers().length === 0 ? undefined : y.getModifiers().map(x => x.getText()),
                            initializer:
                                y.getInitializer() === undefined ? undefined : y.getInitializerOrThrow().getText(),
                            decorators: new DecoratorExtractor().extract(y),
                        };
                    }),
        };
    }

    public extractFromClass(node: ClassDeclaration): MethodInfo[] | undefined {
        const methods = node.getMethods().map(x => this.extract(x));
        if (methods.length === 0) return undefined;
        return methods;
    }
}
