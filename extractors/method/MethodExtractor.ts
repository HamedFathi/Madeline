import { ClassDeclaration, MethodDeclaration } from 'ts-morph';
import { MethodInfo } from './MethodInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';
export class MethodExtractor {
    public extract(node: MethodDeclaration, imports: ImportInfo[] | undefined): MethodInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
        return {
            id: getSha256(node.getFullText() + pathInfo.path),
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
            extension: pathInfo.extension,
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(y => y.getText()),
            returnType: new TypeExtractor().extract(
                node.getReturnType(),

                node.getReturnTypeNode(),
                void 0,
                imports,
            ),
            isGenerator: node.isGenerator(),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            hasComment: hasComment,
            decorators: new DecoratorExtractor().extract(node, imports),
            typeParameters: new TypeParameterExtractor().extract(node, imports),
            parameters:
                node.getParameters().length === 0
                    ? void 0
                    : node.getParameters().map(y => {
                          return {
                              name: y.getName(),
                              text: y.getText(),
                              type: new TypeExtractor().extract(
                                  y.getType(),

                                  y.getTypeNode(),
                                  void 0,
                                  imports,
                              ),
                              isOptional: y.isOptional(),
                              isRest: y.isRestParameter(),
                              isParameterProperty: y.isParameterProperty(),
                              modifiers:
                                  y.getModifiers().length === 0 ? void 0 : y.getModifiers().map(x => x.getText()),
                              initializer: y.getInitializer() === void 0 ? void 0 : y.getInitializerOrThrow().getText(),
                              decorators: new DecoratorExtractor().extract(y, imports),
                          };
                      }),
        };
    }

    public extractFromClass(node: ClassDeclaration, imports: ImportInfo[] | undefined): MethodInfo[] | undefined {
        const methods = node.getMethods().map(x => this.extract(x, imports));
        if (methods.length === 0) return void 0;
        return methods;
    }
}
