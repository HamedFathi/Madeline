import { Node, SyntaxKind, ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { NamespaceInfo } from './NamespaceInfo';

export class NamespaceExtractor {
    public extract(node: ClassDeclaration | EnumDeclaration | FunctionDeclaration | InterfaceDeclaration | TypeAliasDeclaration): NamespaceInfo[] | undefined {
        let result = this.getInfo(node);
        return result;
    }

    private getInfo(node: Node, info?: NamespaceInfo[], level?: number): NamespaceInfo[] | undefined {
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
                let isModule = declaration.hasModuleKeyword();
                let modifiers = declaration.getModifiers().length === 0 ? undefined : declaration.getModifiers().map(x => x.getText());
                info.push({ name: name, isModule: isModule, modifiers: modifiers, level: level });
                this.getInfo(declaration, info, ++level);
            }
        }
        return info.length === 0 ? undefined : info;
    }
}
