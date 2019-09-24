import { ClassDeclaration, ConstructorDeclaration } from 'ts-morph';
import { ConstructorParamInfo } from './ConstructorParameterInfo';
import { ConstructorInfo } from './ConstructorInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';

export class ConstructorExtractor {
    public extract(node: ConstructorDeclaration): ConstructorInfo {
        const isImplementation = node.isImplementation();
        const isOverload = node.isOverload();
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const modifiers = node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText());
        const variables = node.getVariableStatements().map(x => new VariableExtractor().extract(x));
        const params: ConstructorParamInfo[] = node.getParameters().map(x => {
            return {
                name: x.getName(),
                type: new TypeExtractor().extract(x.getType(), x.getTypeNode(), undefined),
                modifiers: x.getModifiers().length === 0 ? undefined : x.getModifiers().map(y => y.getText()),
                isOptional: x.isOptional(),
                isRest: x.isRestParameter(),
                isParameterProperty: x.isParameterProperty(),
                initializer: x.getInitializer() === undefined ? undefined : x.getInitializerOrThrow().getText(),
                decorators: new DecoratorExtractor().extract(x),
                text: x.getText(),
            };
        });
        return {
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            modifiers: modifiers,
            isParameterLess: params.length === 0,
            isImplementation: isImplementation,
            isOverload: isOverload,
            parameters: params.length === 0 ? undefined : params,
            variables: variables.length === 0 ? undefined : variables,
            text: node.getText(),
            hasComment: hasComment,
        };
    }

    public extractFromClass(node: ClassDeclaration): ConstructorInfo[] | undefined {
        const result: ConstructorInfo[] = [];
        const ctors = node.getConstructors();
        if (ctors.length === 0) return undefined;
        ctors.forEach(ctor => {
            result.push(this.extract(ctor));
        });
        return result;
    }
}
