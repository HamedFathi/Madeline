import { ClassDeclaration, SyntaxKind } from 'ts-morph';
import { ClassInfo } from './ClassInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { PathUtils } from '../../utilities/PathUtils';
import { HashUtils } from '../../utilities/HashUtils';

export class ClassExtractor {
    constructor(
        private moduleExtractor: ModuleExtractor = new ModuleExtractor(),
        private pathUtils: PathUtils = new PathUtils(),
        private hashUtils: HashUtils = new HashUtils(),
        private decoratorExtractor: DecoratorExtractor = new DecoratorExtractor(),
        private typeParameterExtractor: TypeParameterExtractor = new TypeParameterExtractor(),
        private typescriptCommentExtractor: TypescriptCommentExtractor = new TypescriptCommentExtractor(),
    ) {}

    public extract(node: ClassDeclaration, imports: ImportInfo[] | undefined): ClassInfo | undefined {
        if (node.getKind() !== SyntaxKind.ClassDeclaration) return void 0;

        const trailingComments = this.typescriptCommentExtractor.extract(node.getTrailingCommentRanges());
        const leadingComments = this.typescriptCommentExtractor.extract(node.getLeadingCommentRanges());
        const decorators = this.decoratorExtractor.extract(node, imports);
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const pathInfo = this.pathUtils.getPathInfo(node.getSourceFile().getFilePath());
        return {
            id: this.hashUtils.getSha256(node.getText()),
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(x => x.getText()),
            extends: node.getExtends() === void 0 ? void 0 : node.getExtendsOrThrow().getText(),
            implements: node.getImplements().length === 0 ? void 0 : node.getImplements().map(x => x.getText()),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            decorators: decorators,
            modules: this.moduleExtractor.extract(node),
            typeParameters: this.typeParameterExtractor.extract(node, imports),
            hasComment: hasComment,
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
        };
    }
}
