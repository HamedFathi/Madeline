import { ClassDeclaration, SyntaxKind } from 'ts-morph';
import { ClassInfo } from './ClassInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';

export class ClassExtractor {

    constructor(
        private moduleExtractor: ModuleExtractor = new ModuleExtractor(),
        private decoratorExtractor: DecoratorExtractor = new DecoratorExtractor(),
        private typeParameterExtractor: TypeParameterExtractor = new TypeParameterExtractor(),
        private typescriptCommentExtractor: TypescriptCommentExtractor = new TypescriptCommentExtractor()
    ) {
    }

    public extract(node: ClassDeclaration): ClassInfo | undefined {

        var nodeKind = node.getKind();

        if (!(nodeKind == SyntaxKind.ClassDeclaration))
            return void 0;

        const trailingComments = this.typescriptCommentExtractor.extract(node.getTrailingCommentRanges());
        const leadingComments = this.typescriptCommentExtractor.extract(node.getLeadingCommentRanges());
        const decorators = this.decoratorExtractor.extract(node);
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        return {
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            extends: node.getExtends() === undefined ? undefined : node.getExtendsOrThrow().getText(),
            implements: node.getImplements().length === 0 ? undefined : node.getImplements().map(x => x.getText()),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            decorators: decorators,
            modules: this.moduleExtractor.extract(node),
            typeParameters: this.typeParameterExtractor.extract(node),
            hasComment: hasComment,
        };
    }
}
