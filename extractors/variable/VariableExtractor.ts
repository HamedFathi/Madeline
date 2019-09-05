import { VariableStatement, SyntaxKind } from 'ts-morph';
import { TypeExtractor } from '../common/TypeExtractor';
import { VariableInfo } from './VariableInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { VariableInitializerExtractor } from './VariableInitializerExtractor';

export class VariableExtractor {
    public extract(node: VariableStatement): VariableInfo[] {
        const modifiers = node.getModifiers().map(x => x.getText());
        const kind = node.getDeclarationKind();
        const kindName = node.getDeclarationKind().toString();
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const modules = new ModuleExtractor().extract(node);
        const declarations = node.getDeclarationList().getDeclarations();
        const asExpressions = declarations
            .filter(x => x.getInitializer() !== undefined)
            .map(x => x.getInitializerOrThrow().getDescendantsOfKind(SyntaxKind.AsExpression))[0];
        const variables = declarations.map(x => {
            return {
                name: x.getName(),
                type: new TypeExtractor().extract(x.getType()),
                modifiers: modifiers.length === 0 ? undefined : modifiers,
                value:
                    x.getInitializer() === undefined
                        ? undefined
                        : new VariableInitializerExtractor().extract(x.getInitializerOrThrow()),
                kind: kind,
                kindName: kindName,
                trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
                leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
                modules: modules,
                hasAsExpression: asExpressions === undefined || asExpressions.length === 0 ? false : true,
            };
        });
        return variables;
    }
}
