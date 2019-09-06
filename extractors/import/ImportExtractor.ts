import { SyntaxKind, ImportDeclaration, SourceFile } from 'ts-morph';
import { ImportInfo } from './ImportInfo';
import { ImportKind } from './ImportKind';

export class ImportExtractor {
    public extract(sourceFile: SourceFile): ImportInfo[] | undefined {
        const result: ImportInfo[] = [];
        sourceFile.forEachDescendant(node => {
            switch (node.getKind()) {
                case SyntaxKind.ImportDeclaration:
                    const module = (node as ImportDeclaration).getModuleSpecifierValue();
                    const namedImports = (node as ImportDeclaration).getNamedImports();
                    const defaultImport = (node as ImportDeclaration).getDefaultImport();
                    const namespaceImport = (node as ImportDeclaration).getNamespaceImport();
                    if (namedImports && namedImports.length > 0) {
                        namedImports.forEach(imp => {
                            const name = imp.getName();
                            const aliasNode = imp.getAliasNode();
                            let alias = undefined;
                            if (aliasNode) {
                                alias = aliasNode.getText();
                            }
                            const kind = ImportKind.NamedImport;
                            result.push({
                                name: name,
                                alias: alias,
                                module: module,
                                kind: kind,
                                kindName: ImportKind[kind],
                            });
                        });
                    }
                    if (defaultImport) {
                        const name = defaultImport.getText();
                        const alias = undefined;
                        const kind = ImportKind.DefaultImport;
                        result.push({
                            name: name,
                            alias: alias,
                            module: module,
                            kind: kind,
                            kindName: ImportKind[kind],
                        });
                    }
                    if (namespaceImport) {
                        const name = namespaceImport.getText();
                        const alias = undefined;
                        const kind = ImportKind.NamespaceImport;
                        result.push({
                            name: name,
                            alias: alias,
                            module: module,
                            kind: kind,
                            kindName: ImportKind[kind],
                        });
                    }
                    break;
            }
        });
        if (result.length === 0) return undefined;
        return result;
    }
}
