import { InterfaceDeclaration } from 'ts-morph';
import { InterfaceInfo } from './InterfaceInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';

export class InterfaceExtractor {
    private readonly typeParameterExtractor = new TypeParameterExtractor();
    public extract(node: InterfaceDeclaration): InterfaceInfo {
        const result: InterfaceInfo = {
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            trailingComments:
                new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()),
            leadingComments:
                new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()).length === 0
                    ? undefined
                    : new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()),
            modules: new ModuleExtractor().extract(node),
            typeParameters: this.typeParameterExtractor.extract(node),
            properties:
                node.getProperties().length === 0
                    ? undefined
                    : node.getProperties().map(x => {
                          return {
                              name: x.getName(),
                              text: x.getText(),
                              type: new TypeExtractor().extract(x.getType()),
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
                              returnType: new TypeExtractor().extract(x.getReturnType()),
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
                                                type: new TypeExtractor().extract(y.getType()),
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
                              returnType: new TypeExtractor().extract(x.getReturnType()),
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
                                                text: x.getText(),
                                                type: new TypeExtractor().extract(y.getType()),
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
                              returnType: new TypeExtractor().extract(x.getReturnType()),
                              text: x.getText(),
                              key: x.getKeyName(),
                              value: x.getKeyType().getText(),
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
                              returnType: new TypeExtractor().extract(x.getReturnType()),
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
                                                type: new TypeExtractor().extract(y.getType()),
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
