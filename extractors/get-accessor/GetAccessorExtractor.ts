import { ClassDeclaration, GetAccessorDeclaration } from 'ts-morph';
import { GetAccessorInfo } from './GetAccessorInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';
import { TypeScope } from '../common/TypeScope';
export class GetAccessorExtractor {
    public extract(node: GetAccessorDeclaration, imports: ImportInfo[] | undefined): GetAccessorInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const typeParameters = new TypeParameterExtractor().extract(node, TypeScope.GetAccessors, imports);
        const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
        return {
            id: getSha256(node.getFullText() + pathInfo.path),
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
            extension: pathInfo.extension,
            name: node.getName(),
            text: node.getText(),
            returnType: new TypeExtractor().extract(
                node.getReturnType(),
                TypeScope.Classes,
                node.getReturnTypeNode(),
                void 0,
                imports,
            ),
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(y => y.getText()),
            decorators: new DecoratorExtractor().extract(node, imports),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            hasComment: hasComment,
            typeParameters: typeParameters,
        };
    }

    public extractFromClass(node: ClassDeclaration, imports: ImportInfo[] | undefined): GetAccessorInfo[] | undefined {
        const getAccessors = node.getGetAccessors().map(x => this.extract(x, imports));
        if (getAccessors.length === 0) return void 0;
        return getAccessors;
    }
}
