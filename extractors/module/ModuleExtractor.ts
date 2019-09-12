import {
    Node,
    SyntaxKind,
    ClassDeclaration,
    EnumDeclaration,
    FunctionDeclaration,
    InterfaceDeclaration,
    TypeAliasDeclaration,
    VariableStatement,
    ExpressionStatement,
    ExportAssignment,
} from 'ts-morph';
import { ModuleInfo } from './ModuleInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';

export class ModuleExtractor {
    public extract(
        node:
            | ClassDeclaration
            | EnumDeclaration
            | FunctionDeclaration
            | InterfaceDeclaration
            | TypeAliasDeclaration
            | VariableStatement
            | ExpressionStatement
            | ExportAssignment,
    ): ModuleInfo[] | undefined {
        const result = this.getInfo(node);
        return result;
    }

    private getInfo(node: Node, info?: ModuleInfo[], level?: number): ModuleInfo[] | undefined {
        if (!info) {
            info = [];
        }
        if (!level) {
            level = 1;
        }
        const block = node.getParentIfKind(SyntaxKind.ModuleBlock);
        if (block) {
            const declaration = block.getParentIfKind(SyntaxKind.ModuleDeclaration);
            if (declaration) {
                const name = declaration.getName();
                const text = declaration.getText();
                const trailingComments = new TypescriptCommentExtractor().extract(
                    declaration.getTrailingCommentRanges(),
                );
                const leadingComments = new TypescriptCommentExtractor().extract(declaration.getLeadingCommentRanges());

                const isNamespace = declaration.hasNamespaceKeyword();
                const modifiers =
                    declaration.getModifiers().length === 0
                        ? undefined
                        : declaration.getModifiers().map(x => x.getText());
                info.push({
                    name: name,
                    text: text,
                    isNamespace: isNamespace,
                    modifiers: modifiers,
                    level: level,
                    leadingComments: leadingComments,
                    trailingComments: trailingComments,
                });
                this.getInfo(declaration, info, ++level);
            }
        }
        return info.length === 0 ? undefined : info;
    }
}
