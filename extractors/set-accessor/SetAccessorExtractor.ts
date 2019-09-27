import { ClassDeclaration, SetAccessorDeclaration } from 'ts-morph';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { SetAccessorInfo } from './SetAccessorInfo';

export class SetAccessorExtractor {
    public extract(node: SetAccessorDeclaration): SetAccessorInfo {
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
                    modifiers: y.getModifiers().length === 0 ? void 0 : y.getModifiers().map(z => z.getText()),
                    type: new TypeExtractor().extract(y.getType(), y.getTypeNode(), void 0),
                };
            })[0],
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(y => y.getText()),
            decorators: new DecoratorExtractor().extract(node),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            hasComment: hasComment,
            variables:
                node.getVariableStatements().map(y => new VariableExtractor().extract(y)).length === 0
                    ? void 0
                    : node.getVariableStatements().map(y => new VariableExtractor().extract(y)),
        };
    }
    public extractFromClass(node: ClassDeclaration): SetAccessorInfo[] | undefined {
        const setAccessors = node.getSetAccessors().map(x => this.extract(x));
        if (setAccessors.length === 0) return void 0;
        return setAccessors;
    }
}
