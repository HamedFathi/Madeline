import { VariableStatement, SyntaxKind } from 'ts-morph';
import { TypeExtractor } from '../common/TypeExtractor';
import { VariableInfo } from './VariableInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';
import { VariableInitializerExtractor } from './VariableInitializerExtractor';

export class VariableExtractor {
    public extract(node: VariableStatement): VariableInfo[] {
        let modifiers = node.getModifiers().map(x => x.getText());
        let kind = node.getDeclarationKind();
        let kindName = node.getDeclarationKind().toString();
        let trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        let leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        let modules = new ModuleExtractor().extract(node);
        let declarations = node.getDeclarationList().getDeclarations();
        let asExpressions = declarations
            .filter(x=>x.getInitializer() !== undefined)
            .map(x=>x.getInitializerOrThrow().getDescendantsOfKind(SyntaxKind.AsExpression))[0];            
        let variables = declarations.map(x => {
            return {
                name: x.getName(),
                type: new TypeExtractor().extract(x.getType()),
                modifiers: modifiers.length === 0
                    ? undefined
                    : modifiers,
                value: x.getInitializer() === undefined
                    ? undefined
                    : new VariableInitializerExtractor().extract(x.getInitializerOrThrow()),
                kind: kind,
                kindName: kindName,
                trailingComments: trailingComments.length === 0 ? undefined : trailingComments,
                leadingComments: leadingComments.length === 0 ? undefined : leadingComments,
                modules: modules,
                hasAsExpression : (asExpressions === undefined || asExpressions.length === 0) ? false : true
            };
        });
        return variables;
    }
}


