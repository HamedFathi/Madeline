import { ClassDeclaration, SetAccessorDeclaration } from 'ts-morph';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { SetAccessorInfo } from './SetAccessorInfo';
import { ImportInfo } from '../import/ImportInfo';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';

export class SetAccessorExtractor {
    public extract(node: SetAccessorDeclaration, imports: ImportInfo[] | undefined): SetAccessorInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const typeParameters = new TypeParameterExtractor().extract(node, imports);
        return {
            name: node.getName(),
            text: node.getText(),
            parameter: node.getParameters().map(y => {
                return {
                    name: y.getName(),
                    text: y.getText(),
                    modifiers: y.getModifiers().length === 0 ? void 0 : y.getModifiers().map(z => z.getText()),
                    type: new TypeExtractor().extract(y.getType(), y.getTypeNode(), void 0, imports),
                };
            })[0],
            typeParameters: typeParameters,
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(y => y.getText()),
            decorators: new DecoratorExtractor().extract(node, imports),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            hasComment: hasComment,
            variables:
                node.getVariableStatements().map(y => new VariableExtractor().extract(y, imports)).length === 0
                    ? void 0
                    : node.getVariableStatements().map(y => new VariableExtractor().extract(y, imports)),
        };
    }
    public extractFromClass(node: ClassDeclaration, imports: ImportInfo[] | undefined): SetAccessorInfo[] | undefined {
        const setAccessors = node.getSetAccessors().map(x => this.extract(x, imports));
        if (setAccessors.length === 0) return void 0;
        return setAccessors;
    }
}
