import { Node, SyntaxKind, ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, TypeAliasDeclaration, VariableStatement, ExpressionStatement, ExportAssignment } from 'ts-morph';
import { ModuleInfo } from './ModuleInfo';

export class ModuleExtractor {
    public extract(node: ClassDeclaration | EnumDeclaration | FunctionDeclaration | InterfaceDeclaration | TypeAliasDeclaration | VariableStatement | ExpressionStatement | ExportAssignment): ModuleInfo[] | undefined {
        let result = this.getInfo(node);
        return result;
    }

    private getInfo(node: Node, info?: ModuleInfo[], level?: number): ModuleInfo[] | undefined {
        if (!info) {
            info = [];
        }
        if (!level) {
            level = 1;
        }
        let block = node.getParentIfKind(SyntaxKind.ModuleBlock);
        if (block) {
            let declaration = block.getParentIfKind(SyntaxKind.ModuleDeclaration)
            if (declaration) {
                let name = declaration.getName();
                let isNamespace = declaration.hasNamespaceKeyword();
                let modifiers = declaration.getModifiers().length === 0 ? undefined : declaration.getModifiers().map(x => x.getText());
                info.push({ name: name, isNamespace: isNamespace, modifiers: modifiers, level: level });
                this.getInfo(declaration, info, ++level);
            }
        }
        return info.length === 0 ? undefined : info;
    }
}

