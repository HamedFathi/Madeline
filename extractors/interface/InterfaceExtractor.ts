import { InterfaceDeclaration } from 'ts-morph';
import { InterfaceInfo } from './InterfaceInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { NamespaceExtractor } from '../namespace/NamespaceExtractor';

export class InterfaceExtractor {
    public extract(node: InterfaceDeclaration): InterfaceInfo {
        let result: InterfaceInfo = {
            name: node.getName(),
            modifiers: node.getModifiers().length === 0 ? undefined : node.getModifiers().map(x => x.getText()),
            trailingComments: new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()).length === 0
                ? undefined
                : new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges()),
            leadingComments: new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()).length === 0
                ? undefined
                : new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges()),
            namespaces: new NamespaceExtractor().extract(node),
            properties: node.getProperties().length === 0 ? undefined : node.getProperties().map(x => {
                return {
                    name: x.getName(),
                    type: new TypeExtractor().extract(x.getType()),
                    isOptional: x.getQuestionTokenNode() !== undefined,
                    trailingComments: new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments: new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                }
            }),
            methods: node.getMethods().length === 0 ? undefined : node.getMethods().map(x => {
                return {
                    name: x.getName(),
                    returnType: new TypeExtractor().extract(x.getReturnType()),
                    trailingComments: new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments: new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                    params: x.getParameters().length === 0 ? undefined : x.getParameters().map(y => {
                        return {
                            name: y.getName(),
                            type: new TypeExtractor().extract(y.getType()),
                            isOptional: y.isOptional(),
                            isRest: y.isRestParameter(),
                            isParameterProperty: y.isParameterProperty(),
                            modifiers: y.getModifiers().length === 0 ? undefined : y.getModifiers().map(x => x.getText()),
                        }
                    })
                }
            }),
            extends: node.getBaseDeclarations().length === 0 ? undefined : node.getBaseDeclarations().map(x => {
                return {
                    name: x.getName(),
                    type: new TypeExtractor().extract(x.getType()),
                }
            }),
            callSignatures: node.getCallSignatures().length === 0 ? undefined : node.getCallSignatures().map(x => {
                return {
                    returnType: new TypeExtractor().extract(x.getReturnType()),
                    trailingComments: new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments: new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                    params: x.getParameters().length === 0 ? undefined : x.getParameters().map(y => {
                        return {
                            name: y.getName(),
                            type: new TypeExtractor().extract(y.getType()),
                            modifiers: y.getModifiers().length === 0 ? undefined : y.getModifiers().map(x => x.getText()),
                            isOptional: y.isOptional(),
                            isRest: y.isRestParameter(),
                            isParameterProperty: y.isParameterProperty()
                        }
                    })
                }
            }),
            indexers: node.getIndexSignatures().length === 0 ? undefined : node.getIndexSignatures().map(x => {
                return {
                    returnType: new TypeExtractor().extract(x.getReturnType()),
                    key: x.getKeyName(),
                    value: x.getKeyType().getText(),
                    trailingComments: new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments: new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                }
            }),
            constructors: node.getConstructSignatures().length === 0 ? undefined : node.getConstructSignatures().map(x => {
                return {
                    returnType: new TypeExtractor().extract(x.getReturnType()),
                    trailingComments: new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                    leadingComments: new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                    params: x.getParameters().length === 0 ? undefined : x.getParameters().map(y => {
                        return {
                            name: y.getName(),
                            type: new TypeExtractor().extract(y.getType()),
                            modifiers: y.getModifiers().length === 0 ? undefined : y.getModifiers().map(x => x.getText()),
                            isOptional: y.isOptional(),
                            isRest: y.isRestParameter(),
                            isParameterProperty: y.isParameterProperty(),
                        }
                    })
                }
            })
        };
        return result;
    }
}

