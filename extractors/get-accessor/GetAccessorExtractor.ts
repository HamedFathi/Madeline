import { ClassDeclaration } from 'ts-morph';
import { GetAccessorInfo } from './GetAccessorInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';

export class GetAccessorExtractor {

    public extract(node: ClassDeclaration): GetAccessorInfo[] | undefined {
        let getAccessors = node
            .getGetAccessors()
            .map(x => {
                return {
                    name: x.getName(),
                    returnType: new TypeExtractor().extract(x.getReturnType()),
                    modifiers: x.getModifiers().length === 0 ? undefined : x.getModifiers().map(y => y.getText()),
                    decorators: new DecoratorExtractor().extract(x),
                    trailingComments: new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments: new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges())
                }
            });
        if (getAccessors.length === 0) return undefined;
        return getAccessors;
    }
}


