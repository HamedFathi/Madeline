import { ClassDeclaration } from 'ts-morph';
import { ClassInfo } from './ClassInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { NamespaceExtractor } from '../namespace/NamespaceExtractor';

export class ClassExtractor {
    public extract(node: ClassDeclaration): ClassInfo {
        let trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        let leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        let decorators = new DecoratorExtractor().extract(node);
        let typeParameters = node.getTypeParameters().map(y => {
            return {
                name: y.getName(),
                constraint: y.getConstraint() === undefined
                    ? undefined
                    : y.getConstraintOrThrow().getType().getText()
            }
        });
        return {
            name: node.getName(),
            text: node.getFullText(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            extends: node.getExtends() === undefined ? undefined : node.getExtendsOrThrow().getText(),
            implements: node.getImplements().length === 0 ? undefined : node.getImplements().map(x => x.getText()),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            decorators: decorators,
            namespaces: new NamespaceExtractor().extract(node),
            typeParameters: typeParameters.length === 0 ? undefined : typeParameters
        }
    }
}


