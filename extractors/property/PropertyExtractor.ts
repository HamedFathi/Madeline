import { ClassDeclaration } from 'ts-morph';
import { PropertyInfo } from './PropertyInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';

export class PropertyExtractor {

    public extract(node: ClassDeclaration): PropertyInfo[] | undefined {
        let props = node.getProperties().map(x => {
            return {
                name: x.getName(),
                type: new TypeExtractor().extract(x.getType()),
                modifiers: x.getModifiers().length === 0 ? undefined : x.getModifiers().map(y => y.getText()),
                isOptional: x.getQuestionTokenNode() !== undefined,
                defaultValue: x.getInitializer() === undefined ? undefined : x.getInitializerOrThrow().getText(),
                trailingComments: new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                leadingComments: new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                decorators: new DecoratorExtractor().extract(x)
            }
        });
        if (props.length === 0) return undefined;
        return props;
    }
}

