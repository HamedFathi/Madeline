import { ClassDeclaration, SetAccessorDeclaration } from 'ts-morph';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { SetAccessorInfo } from './SetAccessorInfo';

export class SetAccessorExtractor {
    public extract(node: SetAccessorDeclaration): SetAccessorInfo {
        return {
            name: node.getName(),
            text: node.getText(),
            parameter: node.getParameters().map(y => {
                return {
                    name: y.getName(),
                    text: y.getText(),
                    modifiers: y.getModifiers().length === 0 ? undefined : y.getModifiers().map(z => z.getText()),
                    type: new TypeExtractor().extract(y.getType()),
                };
            })[0],
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
    public extractFromClass(node: ClassDeclaration): SetAccessorInfo[] | undefined {
        const setAccessors = node.getSetAccessors().map(x => this.extract(x));
        if (setAccessors.length === 0) return undefined;
        return setAccessors;
    }
}
