import { FunctionDeclaration, FunctionExpression } from 'ts-morph';
import { FunctionInfo } from './FunctionInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';

export class FunctionExtractor {
    public extractFromExpression(node: FunctionExpression): FunctionInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const returnType =
            node.getReturnType() === undefined ? undefined : new TypeExtractor().extract(node.getReturnType());
        const variables = node.getVariableStatements().map(x => new VariableExtractor().extract(x));
        const result: FunctionInfo = {
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            isGenerator: node.isGenerator(),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            typeParameters: new TypeParameterExtractor().extract(node),
            returnType: returnType,
            variables: variables.length === 0 ? undefined : variables,
            parameters:
                node.getParameters().length === 0
                    ? undefined
                    : node.getParameters().map(x => {
                          return {
                              name: x.getName(),
                              text: x.getText(),
                              type: new TypeExtractor().extract(x.getType()),
                              modifiers:
                                  x.getModifiers().length === 0 ? undefined : x.getModifiers().map(y => y.getText()),
                              isOptional: x.isOptional(),
                              isRest: x.isRestParameter(),
                              isParameterProperty: x.isParameterProperty(),
                              initializer:
                                  x.getInitializer() === undefined ? undefined : x.getInitializerOrThrow().getText(),
                          };
                      }),
        };
        return result;
    }

    public extract(node: FunctionDeclaration): FunctionInfo {
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const returnType =
            node.getReturnType() === undefined ? undefined : new TypeExtractor().extract(node.getReturnType());
        const variables = node.getVariableStatements().map(x => new VariableExtractor().extract(x));
        const result: FunctionInfo = {
            name: node.getName(),
            text: node.getText(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            isGenerator: node.isGenerator(),
            isOverload: node.isOverload(),
            isImplementation: node.isImplementation(),
            trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
            leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
            modules: new ModuleExtractor().extract(node),
            typeParameters: new TypeParameterExtractor().extract(node),
            returnType: returnType,
            variables: variables.length === 0 ? undefined : variables,
            parameters:
                node.getParameters().length === 0
                    ? undefined
                    : node.getParameters().map(x => {
                          return {
                              name: x.getName(),
                              text: node.getText(),
                              type: new TypeExtractor().extract(x.getType()),
                              modifiers:
                                  x.getModifiers().length === 0 ? undefined : x.getModifiers().map(y => y.getText()),
                              isOptional: x.isOptional(),
                              isRest: x.isRestParameter(),
                              isParameterProperty: x.isParameterProperty(),
                              initializer:
                                  x.getInitializer() === undefined ? undefined : x.getInitializerOrThrow().getText(),
                          };
                      }),
        };
        return result;
    }
}
