import { ClassDeclaration } from 'ts-morph';
import { MethodInfo } from './MethodInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';

export class MethodExtractor {

    public extract(node: ClassDeclaration): MethodInfo[] | undefined {
        let methods = node
            .getMethods()
            .map(x => {
                return {
                    name: x.getName(),
                    modifiers: x.getModifiers().length === 0 ? undefined : x.getModifiers().map(y => y.getText()),
                    returnType: new TypeExtractor().extract(x.getReturnType()),
                    isGenerator: x.isGenerator(),
                    trailingComments: new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments: new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                    decorators: new DecoratorExtractor().extract(x),
                    variables: x.getVariableStatements().map(y=> new VariableExtractor().extract(y)).length === 0
                    ? undefined
                    : x.getVariableStatements().map(y=> new VariableExtractor().extract(y)),
                    parameters: x.getParameters().length === 0 ? undefined : x.getParameters().map(y => {
                        return {
                            name: y.getName(),
                            type: new TypeExtractor().extract(y.getType()),
                            isOptional: y.isOptional(),
                            isRest: y.isRestParameter(),
                            isParameterProperty: y.isParameterProperty(),
                            modifiers: y.getModifiers().length === 0 ? undefined : y.getModifiers().map(x => x.getText()),
                            defaultValue: y.getInitializer() === undefined ? undefined : y.getInitializerOrThrow().getText(),
                            decorators: new DecoratorExtractor().extract(y)
                        }
                    })
                }
            });
        if (methods.length === 0) return undefined;
        return methods;
    }
}