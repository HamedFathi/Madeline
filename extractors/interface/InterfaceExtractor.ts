import { InterfaceDeclaration } from 'ts-morph';
import { InterfaceInfo } from './InterfaceInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';

export class InterfaceExtractor {
    private readonly typeParameterExtractor = new TypeParameterExtractor();

    public extract(node: InterfaceDeclaration): InterfaceInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const result: InterfaceInfo = {
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(x => x.getText()),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            modules: new ModuleExtractor().extract(node),
            typeParameters: this.typeParameterExtractor.extract(node),
            hasComment: hasComment,
            properties:
                node.getProperties().length === 0
                    ? void 0
                    : node.getProperties().map(x => {
                          return {
                              name: x.getName(),
                              text: x.getText(),
                              type: new TypeExtractor().extract(x.getType(), x.getTypeNode(), undefined),
                              isOptional: x.hasQuestionToken(),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                          };
                      }),
            methods:
                node.getMethods().length === 0
                    ? void 0
                    : node.getMethods().map(x => {
                          return {
                              name: x.getName(),
                              text: x.getText(),
                              typeParameters: this.typeParameterExtractor.extract(x),
                              returnType: new TypeExtractor().extract(
                                  x.getReturnType(),
                                  x.getReturnTypeNode(),
                                  undefined,
                              ),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                              parameters:
                                  x.getParameters().length === 0
                                      ? void 0
                                      : x.getParameters().map(y => {
                                            return {
                                                name: y.getName(),
                                                text: y.getText(),
                                                type: new TypeExtractor().extract(
                                                    y.getType(),
                                                    y.getTypeNode(),
                                                    undefined,
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
                              type: new TypeExtractor().extract(x.getType(), undefined, undefined),
                          };
                      }),
            callSignatures:
                node.getCallSignatures().length === 0
                    ? void 0
                    : node.getCallSignatures().map(x => {
                          return {
                              returnType: new TypeExtractor().extract(
                                  x.getReturnType(),
                                  x.getReturnTypeNode(),
                                  undefined,
                              ),
                              text: x.getText(),
                              typeParameters: this.typeParameterExtractor.extract(x),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                              parameters:
                                  x.getParameters().length === 0
                                      ? void 0
                                      : x.getParameters().map(y => {
                                            return {
                                                name: y.getName(),
                                                text: y.getText(),
                                                type: new TypeExtractor().extract(
                                                    y.getType(),
                                                    y.getTypeNode(),
                                                    undefined,
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
                              returnType: new TypeExtractor().extract(
                                  x.getReturnType(),
                                  x.getReturnTypeNode(),
                                  undefined,
                              ),
                              text: x.getText(),
                              key: x.getKeyName(),
                              value: new TypeExtractor().extract(x.getKeyType(), x.getKeyTypeNode(), undefined),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                          };
                      }),
            constructors:
                node.getConstructSignatures().length === 0
                    ? void 0
                    : node.getConstructSignatures().map(x => {
                          return {
                              returnType: new TypeExtractor().extract(
                                  x.getReturnType(),
                                  x.getReturnTypeNode(),
                                  undefined,
                              ),
                              text: x.getText(),
                              typeParameters: this.typeParameterExtractor.extract(x),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? void 0
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                              parameters:
                                  x.getParameters().length === 0
                                      ? void 0
                                      : x.getParameters().map(y => {
                                            return {
                                                name: y.getName(),
                                                text: y.getText(),
                                                type: new TypeExtractor().extract(
                                                    y.getType(),
                                                    y.getTypeNode(),
                                                    undefined,
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
