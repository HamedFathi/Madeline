import { InterfaceDeclaration } from 'ts-morph';
import { InterfaceInfo } from './InterfaceInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';
import { TypeScope } from '../common/TypeScope';
export class InterfaceExtractor {
    constructor(
        private typeParameterExtractor = new TypeParameterExtractor(),
        private typescriptCommentExtractor = new TypescriptCommentExtractor(),
        private typeExtractor = new TypeExtractor(),
    ) {}

    public extract(node: InterfaceDeclaration, imports: ImportInfo[] | undefined): InterfaceInfo {
        const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
        const trailingComments = this.typescriptCommentExtractor.extract(node.getTrailingCommentRanges());
        const leadingComments = this.typescriptCommentExtractor.extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const result: InterfaceInfo = {
            id: getSha256(node.getFullText() + pathInfo.path),
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(x => x.getText()),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
            extension: pathInfo.extension,
            modules: new ModuleExtractor().extract(node),
            typeParameters: this.typeParameterExtractor.extract(node, TypeScope.Interfaces, imports),
            hasComment: hasComment,
            properties:
                node.getProperties().length === 0
                    ? void 0
                    : node.getProperties().map(x => {
                          return {
                              name: x.getName(),
                              text: x.getText(),
                              type: this.typeExtractor.extract(
                                  x.getType(),
                                  TypeScope.Interfaces,
                                  x.getTypeNode(),
                                  undefined,
                                  imports,
                              ),
                              isOptional: x.hasQuestionToken(),
                              trailingComments:
                                  this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()),
                          };
                      }),
            methods:
                node.getMethods().length === 0
                    ? void 0
                    : node.getMethods().map(x => {
                          return {
                              name: x.getName(),
                              text: x.getText(),
                              typeParameters: this.typeParameterExtractor.extract(
                                  x,
                                  TypeScope.MethodsOfInterface,
                                  imports,
                              ),
                              returnType: this.typeExtractor.extract(
                                  x.getReturnType(),
                                  TypeScope.Interfaces,
                                  x.getReturnTypeNode(),
                                  void 0,
                                  imports,
                              ),
                              trailingComments:
                                  this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()),
                              parameters:
                                  x.getParameters().length === 0
                                      ? void 0
                                      : x.getParameters().map(y => {
                                            return {
                                                name: y.getName(),
                                                text: y.getText(),
                                                type: this.typeExtractor.extract(
                                                    y.getType(),
                                                    TypeScope.Interfaces,
                                                    y.getTypeNode(),
                                                    void 0,
                                                    imports,
                                                ),
                                                isOptional: y.isOptional(),
                                                isRest: y.isRestParameter(),
                                                isParameterProperty: y.isParameterProperty(),
                                                initializer:
                                                    y.getInitializer() === void 0
                                                        ? void 0
                                                        : y.getInitializerOrThrow().getText(),
                                                modifiers:
                                                    y.getModifiers().length === 0
                                                        ? void 0
                                                        : y.getModifiers().map(x => x.getText()),
                                            };
                                        }),
                          };
                      }),
            extends:
                node.getExtends().length === 0
                    ? void 0
                    : node.getExtends().map(x => {
                          return {
                              name: x.getText(),
                              type: this.typeExtractor.extract(
                                  x.getType(),
                                  TypeScope.Interfaces,
                                  undefined,
                                  undefined,
                                  imports,
                              ),
                          };
                      }),
            callSignatures:
                node.getCallSignatures().length === 0
                    ? void 0
                    : node.getCallSignatures().map(x => {
                          return {
                              returnType: this.typeExtractor.extract(
                                  x.getReturnType(),
                                  TypeScope.Interfaces,
                                  x.getReturnTypeNode(),
                                  void 0,
                                  imports,
                              ),
                              text: x.getText(),
                              typeParameters: this.typeParameterExtractor.extract(
                                  x,
                                  TypeScope.CallSignaturesOfInterface,
                                  imports,
                              ),
                              trailingComments:
                                  this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()),
                              parameters:
                                  x.getParameters().length === 0
                                      ? void 0
                                      : x.getParameters().map(y => {
                                            return {
                                                name: y.getName(),
                                                text: y.getText(),
                                                type: this.typeExtractor.extract(
                                                    y.getType(),
                                                    TypeScope.Interfaces,
                                                    y.getTypeNode(),
                                                    undefined,
                                                    imports,
                                                ),
                                                modifiers:
                                                    y.getModifiers().length === 0
                                                        ? void 0
                                                        : y.getModifiers().map(x => x.getText()),
                                                isOptional: y.isOptional(),
                                                isRest: y.isRestParameter(),
                                                isParameterProperty: y.isParameterProperty(),
                                                initializer:
                                                    y.getInitializer() === void 0
                                                        ? void 0
                                                        : y.getInitializerOrThrow().getText(),
                                            };
                                        }),
                          };
                      }),
            indexers:
                node.getIndexSignatures().length === 0
                    ? void 0
                    : node.getIndexSignatures().map(x => {
                          return {
                              returnType: this.typeExtractor.extract(
                                  x.getReturnType(),
                                  TypeScope.Interfaces,
                                  x.getReturnTypeNode(),
                                  void 0,
                                  imports,
                              ),
                              text: x.getText(),
                              key: x.getKeyName(),
                              value: this.typeExtractor.extract(
                                  x.getKeyType(),
                                  TypeScope.Interfaces,
                                  x.getKeyTypeNode(),
                                  void 0,
                                  imports,
                              ),
                              trailingComments:
                                  this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()),
                          };
                      }),
            constructors:
                node.getConstructSignatures().length === 0
                    ? void 0
                    : node.getConstructSignatures().map(x => {
                          return {
                              returnType: this.typeExtractor.extract(
                                  x.getReturnType(),
                                  TypeScope.Interfaces,
                                  x.getReturnTypeNode(),
                                  void 0,
                                  imports,
                              ),
                              text: x.getText(),
                              typeParameters: this.typeParameterExtractor.extract(
                                  x,
                                  TypeScope.ConstructorsOfInterface,
                                  imports,
                              ),
                              trailingComments:
                                  this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : this.typescriptCommentExtractor.extract(x.getLeadingCommentRanges()),
                              parameters:
                                  x.getParameters().length === 0
                                      ? void 0
                                      : x.getParameters().map(y => {
                                            return {
                                                name: y.getName(),
                                                text: y.getText(),
                                                type: this.typeExtractor.extract(
                                                    y.getType(),
                                                    TypeScope.Interfaces,
                                                    y.getTypeNode(),
                                                    undefined,
                                                    imports,
                                                ),
                                                modifiers:
                                                    y.getModifiers().length === 0
                                                        ? void 0
                                                        : y.getModifiers().map(x => x.getText()),
                                                isOptional: y.isOptional(),
                                                isRest: y.isRestParameter(),
                                                isParameterProperty: y.isParameterProperty(),
                                                initializer:
                                                    y.getInitializer() === void 0
                                                        ? void 0
                                                        : y.getInitializerOrThrow().getText(),
                                            };
                                        }),
                          };
                      }),
        };
        return result;
    }
}
