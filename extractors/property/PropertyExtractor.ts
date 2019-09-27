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
            type: new TypeExtractor().extract(node.getType(), node.getTypeNode(), void 0),
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(y => y.getText()),
            isOptional: node.hasQuestionToken(),
            initializer: node.getInitializer() === void 0 ? void 0 : node.getInitializerOrThrow().getText(),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            hasComment: hasComment,
            decorators: new DecoratorExtractor().extract(node),
        };
    }

    public extractFromClass(node: ClassDeclaration): PropertyInfo[] | undefined {
        const props = node.getProperties().map(x => this.extract(x));
        if (props.length === 0) return void 0;
        return props;
    }
}
