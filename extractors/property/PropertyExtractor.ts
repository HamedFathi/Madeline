import { ClassDeclaration, PropertyDeclaration } from 'ts-morph';
import { PropertyInfo } from './PropertyInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';

export class PropertyExtractor {
    public extract(node: PropertyDeclaration): PropertyInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        return {
            name: node.getName(),
            text: node.getText(),
            type: new TypeExtractor().extract(node.getType(), node.getTypeNode()),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(y => y.getText()),
            isOptional: node.hasQuestionToken(),
            initializer: node.getInitializer() === undefined ? undefined : node.getInitializerOrThrow().getText(),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            hasComment: hasComment,
            decorators: new DecoratorExtractor().extract(node),
        };
    }

    public extractFromClass(node: ClassDeclaration): PropertyInfo[] | undefined {
        const props = node.getProperties().map(x => this.extract(x));
        if (props.length === 0) return undefined;
        return props;
    }
}
