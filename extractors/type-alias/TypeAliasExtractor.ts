import { TypeAliasDeclaration } from 'ts-morph';
import { TypeAliasInfo } from './TypeAliasInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { PathUtils } from '../../utilities/PathUtils';
import { HashUtils } from '../../utilities/HashUtils';

export class TypeAliasExtractor {
    constructor(private pathUtils: PathUtils = new PathUtils(), private hashUtils: HashUtils = new HashUtils()) {}

    public extract(node: TypeAliasDeclaration, imports: ImportInfo[] | undefined): TypeAliasInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const pathInfo = this.pathUtils.getPathInfo(node.getSourceFile().getFilePath());
        return {
            id: this.hashUtils.getSha256(node.getText()),
            name: node.getName(),
            text: node.getText(),
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(x => x.getText()),
            initializer: node.getTypeNode() === void 0 ? '' : node.getTypeNodeOrThrow().getText(),
            type: new TypeExtractor().extract(node.getType(), node.getTypeNode(), void 0, imports),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            modules: new ModuleExtractor().extract(node),
            typeParameters: new TypeParameterExtractor().extract(node, imports),
            hasComment: hasComment,
        };
    }
}
