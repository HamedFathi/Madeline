import { FunctionDeclaration, FunctionExpression } from 'ts-morph';
import { FunctionInfo } from './FunctionInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { PathUtils } from '../../utilities/PathUtils';

export class FunctionExtractor {
    constructor(private pathUtils: PathUtils = new PathUtils()) {}

    public extractFromExpression(node: FunctionExpression, imports: ImportInfo[] | undefined): FunctionInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const pathInfo = this.pathUtils.getPathInfo(node.getSourceFile().getFilePath());
        const returnType =
            node.getReturnType() === void 0
                ? void 0
                : new TypeExtractor().extract(node.getReturnType(), node.getReturnTypeNode(), void 0, imports);
        const variables = node.getVariableStatements().map(x => new VariableExtractor().extract(x, imports));
        const result: FunctionInfo = {
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
            variables: variables.length === 0 ? void 0 : variables,
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
        const variables = node.getVariableStatements().map(x => new VariableExtractor().extract(x, imports));
        const pathInfo = this.pathUtils.getPathInfo(node.getSourceFile().getFilePath());
        const result: FunctionInfo = {
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
            variables: variables.length === 0 ? void 0 : variables,
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
