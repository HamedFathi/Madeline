import { ClassDeclaration, GetAccessorDeclaration } from 'ts-morph';
import { GetAccessorInfo } from './GetAccessorInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';

export class GetAccessorExtractor {
    public extract(node: GetAccessorDeclaration): GetAccessorInfo {
        return {
            name: node.getName(),
            text: node.getText(),
            returnType: new TypeExtractor().extract(node.getReturnType().getText()),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(y => y.getText()),
            decorators: new DecoratorExtractor().extract(node),
            trailingComments:
                new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()),
            leadingComments:
                new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()),
            variables:
                node.getVariableStatements().map(y => new VariableExtractor().extract(y)).length === 0
                    ? undefined
                    : node.getVariableStatements().map(y => new VariableExtractor().extract(y)),
        };
    }

    public extractFromClass(node: ClassDeclaration): GetAccessorInfo[] | undefined {
        const getAccessors = node.getGetAccessors().map(x => this.extract(x));
        if (getAccessors.length === 0) return undefined;
        return getAccessors;
    }
}
