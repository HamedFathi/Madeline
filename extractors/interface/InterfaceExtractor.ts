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
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            modules: new ModuleExtractor().extract(node),
            typeParameters: this.typeParameterExtractor.extract(node),
            hasComment: hasComment,
            properties:
                node.getProperties().length === 0
                    ? undefined
                    : node.getProperties().map(x => {
                          return {
                              name: x.getName(),
                              text: x.getText(),
                              type: new TypeExtractor().extract(x.getType(), x.getTypeNode()),
                              isOptional: x.hasQuestionToken(),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                          };
                      }),
            methods:
                node.getMethods().length === 0
                    ? undefined
                    : node.getMethods().map(x => {
                          return {
                              name: x.getName(),
                              text: x.getText(),
                              typeParameters: this.typeParameterExtractor.extract(x),
                              returnType: new TypeExtractor().extract(x.getReturnType(), x.getReturnTypeNode()),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                              parameters:
                                  x.getParameters().length === 0
                                      ? undefined
                                      : x.getParameters().map(y => {
                                            return {
                                                name: y.getName(),
                                                text: y.getText(),
                                                type: new TypeExtractor().extract(y.getType(), y.getTypeNode()),
                                                isOptional: y.isOptional(),
                                                isRest: y.isRestParameter(),
                                                isParameterProperty: y.isParameterProperty(),
                                                initializer:
                                                    y.getInitializer() === undefined
                                                        ? undefined
                                                        : y.getInitializerOrThrow().getText(),
                                                modifiers:
                                                    y.getModifiers().length === 0
                                                        ? undefined
                                                        : y.getModifiers().map(x => x.getText()),
                                            };
                                        }),
                          };
                      }),
            extends:
                node.getExtends().length === 0
                    ? undefined
                    : node.getExtends().map(x => {
                          return {
                              name: x.getText(),
                              type: new TypeExtractor().extract(x.getType()),
                          };
                      }),
            callSignatures:
                node.getCallSignatures().length === 0
                    ? undefined
                    : node.getCallSignatures().map(x => {
                          return {
                              returnType: new TypeExtractor().extract(x.getReturnType(), x.getReturnTypeNode()),
                              text: x.getText(),
                              typeParameters: this.typeParameterExtractor.extract(x),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                              parameters:
                                  x.getParameters().length === 0
                                      ? undefined
                                      : x.getParameters().map(y => {
                                            return {
                                                name: y.getName(),
                                                text: y.getText(),
                                                type: new TypeExtractor().extract(y.getType(), y.getTypeNode()),
                                                modifiers:
                                                    y.getModifiers().length === 0
                                                        ? undefined
                                                        : y.getModifiers().map(x => x.getText()),
                                                isOptional: y.isOptional(),
                                                isRest: y.isRestParameter(),
                                                isParameterProperty: y.isParameterProperty(),
                                                initializer:
                                                    y.getInitializer() === undefined
                                                        ? undefined
                                                        : y.getInitializerOrThrow().getText(),
                                            };
                                        }),
                          };
                      }),
            indexers:
                node.getIndexSignatures().length === 0
                    ? undefined
                    : node.getIndexSignatures().map(x => {
                          return {
                              returnType: new TypeExtractor().extract(x.getReturnType(), x.getReturnTypeNode()),
                              text: x.getText(),
                              key: x.getKeyName(),
                              value: new TypeExtractor().extract(x.getKeyType(), x.getKeyTypeNode()),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                          };
                      }),
            constructors:
                node.getConstructSignatures().length === 0
                    ? undefined
                    : node.getConstructSignatures().map(x => {
                          return {
                              returnType: new TypeExtractor().extract(x.getReturnType(), x.getReturnTypeNode()),
                              text: x.getText(),
                              typeParameters: this.typeParameterExtractor.extract(x),
                              trailingComments:
                                  new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                              leadingComments:
                                  new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                                      ? undefined
                                      : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                              parameters:
                                  x.getParameters().length === 0
                                      ? undefined
                                      : x.getParameters().map(y => {
                                            return {
                                                name: y.getName(),
                                                text: y.getText(),
                                                type: new TypeExtractor().extract(y.getType(), y.getTypeNode()),
                                                modifiers:
                                                    y.getModifiers().length === 0
                                                        ? undefined
                                                        : y.getModifiers().map(x => x.getText()),
                                                isOptional: y.isOptional(),
                                                isRest: y.isRestParameter(),
                                                isParameterProperty: y.isParameterProperty(),
                                                initializer:
                                                    y.getInitializer() === undefined
                                                        ? undefined
                                                        : y.getInitializerOrThrow().getText(),
                                            };
                                        }),
                          };
                      }),
        };
        return result;
    }
}
