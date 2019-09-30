import { FunctionDeclaration, FunctionExpression } from 'ts-morph';
import { FunctionInfo } from './FunctionInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';

export class FunctionExtractor {

    public extractFromExpression(node: FunctionExpression, imports: ImportInfo[] | undefined): FunctionInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
        const returnType =
            node.getReturnType() === void 0
                ? void 0
                : new TypeExtractor().extract(node.getReturnType(), node.getReturnTypeNode(), void 0, imports);
        const result: FunctionInfo = {
            id: getSha256(node.getFullText() + pathInfo.path),
            name: node.getName(),
            text: node.getText(),
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
            hasComment: hasComment,
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(x => x.getText()),
            isGenerator: node.isGenerator(),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            typeParameters: new TypeParameterExtractor().extract(node, imports),
            returnType: returnType,
            parameters:
                node.getParameters().length === 0
                    ? void 0
                    : node.getParameters().map(x => {
                        return {
                            name: x.getName(),
                            text: x.getText(),
                            type: new TypeExtractor().extract(x.getType(), x.getTypeNode(), void 0, imports),
                            modifiers:
                                x.getModifiers().length === 0 ? void 0 : x.getModifiers().map(y => y.getText()),
                            isOptional: x.isOptional(),
                            isRest: x.isRestParameter(),
                            isParameterProperty: x.isParameterProperty(),
                            initializer: x.getInitializer() === void 0 ? void 0 : x.getInitializerOrThrow().getText(),
                        };
                    }),
        };
        return result;
    }

    public extract(node: FunctionDeclaration, imports: ImportInfo[] | undefined): FunctionInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const returnType =
            node.getReturnType() === void 0
                ? void 0
                : new TypeExtractor().extract(node.getReturnType(), node.getReturnTypeNode(), void 0, imports);
        const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
        const result: FunctionInfo = {
            id: getSha256(node.getFullText() + pathInfo.path),
            name: node.getName(),
            text: node.getText(),
            hasComment: hasComment,
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(x => x.getText()),
            isGenerator: node.isGenerator(),
            isOverload: node.isOverload(),
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
            isImplementation: node.isImplementation(),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            modules: new ModuleExtractor().extract(node),
            typeParameters: new TypeParameterExtractor().extract(node, imports),
            returnType: returnType,
            parameters:
                node.getParameters().length === 0
                    ? void 0
                    : node.getParameters().map(x => {
                        return {
                            name: x.getName(),
                            text: x.getText(),
                            type: new TypeExtractor().extract(x.getType(), x.getTypeNode(), void 0, imports),
                            modifiers:
                                x.getModifiers().length === 0 ? void 0 : x.getModifiers().map(y => y.getText()),
                            isOptional: x.isOptional(),
                            isRest: x.isRestParameter(),
                            isParameterProperty: x.isParameterProperty(),
                            initializer: x.getInitializer() === void 0 ? void 0 : x.getInitializerOrThrow().getText(),
                        };
                    }),
        };
        return result;
    }
}
