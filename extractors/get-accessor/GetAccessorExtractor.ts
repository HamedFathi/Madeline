import { ClassDeclaration, GetAccessorDeclaration } from 'ts-morph';
import { GetAccessorInfo } from './GetAccessorInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { ImportInfo } from '../import/ImportInfo';

export class GetAccessorExtractor {
    public extract(node: GetAccessorDeclaration, imports: ImportInfo[] | undefined): GetAccessorInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        return {
            name: node.getName(),
            text: node.getText(),
            returnType: new TypeExtractor().extract(node.getReturnType(), node.getReturnTypeNode(), void 0, imports),
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(y => y.getText()),
            decorators: new DecoratorExtractor().extract(node, imports),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            hasComment: hasComment,
            variables:
                node.getVariableStatements().map(y => new VariableExtractor().extract(y, imports)).length === 0
                    ? void 0
                    : node.getVariableStatements().map(y => new VariableExtractor().extract(y, imports)),
        };
    }

    public extractFromClass(node: ClassDeclaration, imports: ImportInfo[] | undefined): GetAccessorInfo[] | undefined {
        const getAccessors = node.getGetAccessors().map(x => this.extract(x, imports));
        if (getAccessors.length === 0) return void 0;
        return getAccessors;
    }
}
