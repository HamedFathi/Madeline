import { SyntaxKind, ImportDeclaration, SourceFile, ImportEqualsDeclaration } from 'ts-morph';
import { ImportInfo } from './ImportInfo';
import { ImportKind } from './ImportKind';

export class ImportExtractor {
    public extract(sourceFile: SourceFile): ImportInfo[] | undefined {
        const result: ImportInfo[] = [];
        sourceFile.forEachDescendant(node => {
            switch (node.getKind()) {
                case SyntaxKind.ImportDeclaration:
                    const importDeclaration = node as ImportDeclaration;
                    const textDeclaration = importDeclaration.getText();
                    const moduleValue = importDeclaration.getModuleSpecifierValue();
                    const namedImports = importDeclaration.getNamedImports();
                    const defaultImport = importDeclaration.getDefaultImport();
                    const namespaceImport = importDeclaration.getNamespaceImport();
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
                                module: moduleValue,
                                kind: kind,
                                kindName: ImportKind[kind],
                                text: textDeclaration,
                            });
                        });
                    }
                    if (defaultImport) {
                        const name = defaultImport.getText();
                        const alias: any = undefined;
                        const kind = ImportKind.DefaultImport;
                        result.push({
                            name: name,
                            alias: alias,
                            module: moduleValue,
                            kind: kind,
                            kindName: ImportKind[kind],
                            text: textDeclaration,
                        });
                    }
                    if (namespaceImport) {
                        const name = namespaceImport.getText();
                        const alias: any = undefined;
                        const kind = ImportKind.NamespaceImport;
                        result.push({
                            name: name,
                            alias: alias,
                            module: moduleValue,
                            kind: kind,
                            kindName: ImportKind[kind],
                            text: textDeclaration,
                        });
                    }
                    break;
                case SyntaxKind.ImportEqualsDeclaration:
                    const importEquals = node as ImportEqualsDeclaration;
                    const moduleRefValue = importEquals.getModuleReference().getText();
                    const text = importEquals.getText();
                    const name = importEquals.getName();
                    const kind = ImportKind.ImportEquals;
                    result.push({
                        name: name,
                        alias: undefined,
                        module: moduleRefValue,
                        kind: kind,
                        kindName: ImportKind[kind],
                        text: text,
                    });
                    break;
            }
        });
        if (result.length === 0) return undefined;
        return result;
    }
}
