import { ClassDeclaration, PropertyDeclaration } from 'ts-morph';
import { PropertyInfo } from './PropertyInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';

export class PropertyExtractor {
    public extract(node: PropertyDeclaration): PropertyInfo {
        return {
            name: node.getName(),
            text: node.getText(),
            type: new TypeExtractor().extract(node.getType().getText()),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(y => y.getText()),
            isOptional: node.hasQuestionToken(),
            initializer: node.getInitializer() === undefined ? undefined : node.getInitializerOrThrow().getText(),
            trailingComments:
                new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()),
            leadingComments:
                new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()),
            decorators: new DecoratorExtractor().extract(node),
        };
    }

    public extractFromClass(node: ClassDeclaration): PropertyInfo[] | undefined {
        const props = node.getProperties().map(x => this.extract(x));
        if (props.length === 0) return undefined;
        return props;
    }
}
