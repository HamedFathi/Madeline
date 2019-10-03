import {
    MethodDeclaration,
    InterfaceDeclaration,
    ClassDeclaration,
    FunctionDeclaration,
    CallSignatureDeclaration,
    ConstructSignatureDeclaration,
    MethodSignature,
    FunctionExpression,
    TypeAliasDeclaration,
    GetAccessorDeclaration,
    SetAccessorDeclaration,
} from 'ts-morph';
import { TypeParameterInfo } from './TypeParameterInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { prettify } from '../../utilities/PrettierUtils';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';

export class TypeParameterExtractor {
    public extract(
        node:
            | MethodDeclaration
            | MethodSignature
            | FunctionExpression
            | ConstructSignatureDeclaration
            | CallSignatureDeclaration
            | InterfaceDeclaration
            | ClassDeclaration
            | FunctionDeclaration
            | TypeAliasDeclaration
            | GetAccessorDeclaration
            | SetAccessorDeclaration,
        imports: ImportInfo[] | undefined,
    ): TypeParameterInfo[] | undefined {
        const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
        const text = prettify(node.getFullText());
        const result = node.getTypeParameters().map(y => {
            return {
                id: getSha256(text + pathInfo.path),
                path: pathInfo.path,
                directory: pathInfo.directory,
                file: pathInfo.file,
                extension: pathInfo.extension,
                name: y.getName(),
                text: y.getText(),
                constraint:
                    y.getConstraint() === void 0
                        ? void 0
                        : new TypeExtractor().extract(y.getConstraintOrThrow().getType(), void 0, void 0, imports),
            };
        });
        return result.length === 0 ? void 0 : result;
    }
}
