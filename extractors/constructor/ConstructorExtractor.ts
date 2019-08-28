import { ClassDeclaration } from 'ts-morph';
import { ConstructorParamInfo } from './ConstructorParamInfo';
import { ConstructorInfo } from "./ConstructorInfo";
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';

export class ConstructorExtractor {

    public extract(node: ClassDeclaration): ConstructorInfo[] | undefined {
        let result: ConstructorInfo[] = [];
        let ctors = node.getConstructors();
        if (ctors.length === 0) return undefined;
        ctors.forEach(ctor => {
            let isImplementation = ctor.isImplementation();
            let isOverload = ctor.isOverload();
            let trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
            let leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
            let modifiers = ctor.getModifiers().length === 0 ? undefined : ctor.getModifiers().map(x => x.getText());
            let variables = ctor.getVariableStatements().map(x=> new VariableExtractor().extract(x));
            let params: ConstructorParamInfo[] = ctor.getParameters().map(x => {
                return {
                    name: x.getName(),
                    type: new TypeExtractor().extract(x.getType()),
                    modifiers: x.getModifiers().length === 0 ? undefined : x.getModifiers().map(y => y.getText()),
                    isOptional: x.isOptional(),
                    isRest: x.isRestParameter(),
                    isParameterProperty: x.isParameterProperty(),
                    defaultValue: x.getInitializer() === undefined ? undefined : x.getInitializerOrThrow().getText(),
                    decorators: new DecoratorExtractor().extract(x)
                }
            });
            result.push({
                trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
                leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
                modifiers: modifiers,
                isParameterLess: params.length === 0,
                isImplementation: isImplementation,
                isOverload: isOverload,
                parameters: params.length === 0 ? undefined : params,
                variables: variables.length === 0 ? undefined : variables
            });
        });
        return result;
    }
}


