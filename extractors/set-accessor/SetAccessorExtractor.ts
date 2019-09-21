import { ClassDeclaration, SetAccessorDeclaration } from 'ts-morph';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { SetAccessorInfo } from './SetAccessorInfo';
import { ImportInfo } from '../import/ImportInfo';

export class SetAccessorExtractor {
    public extract(node: SetAccessorDeclaration, imports?: ImportInfo[]): SetAccessorInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        return {
            name: node.getName(),
            text: node.getText(),
            parameter: node.getParameters().map(y => {
                return {
                    name: y.getName(),
                    text: y.getText(),
                    modifiers: y.getModifiers().length === 0 ? undefined : y.getModifiers().map(z => z.getText()),
                    type: new TypeExtractor().extract(y.getType(), y.getTypeNode(), undefined, imports),
                };
            })[0],
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(y => y.getText()),
            decorators: new DecoratorExtractor().extract(node),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            hasComment: hasComment,
            variables:
                node.getVariableStatements().map(y => new VariableExtractor().extract(y)).length === 0
                    ? undefined
                    : node.getVariableStatements().map(y => new VariableExtractor().extract(y)),
        };
    }
    public extractFromClass(node: ClassDeclaration, imports?: ImportInfo[]): SetAccessorInfo[] | undefined {
        const setAccessors = node.getSetAccessors().map(x => this.extract(x, imports));
        if (setAccessors.length === 0) return undefined;
        return setAccessors;
    }
}
