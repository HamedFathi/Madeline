import {    SyntaxKind,    ImportDeclaration,    SourceFile} from 'ts-morph';
import { ImportInfo } from './ImportInfo';
import { ImportKind } from './ImportKind';

export class ImportExtractor {
    public extract(sourceFile: SourceFile): ImportInfo[] | undefined {
        let result: ImportInfo[] = [];
        sourceFile.forEachDescendant(node => {
            switch (node.getKind()) {
                case SyntaxKind.ImportDeclaration:
                    let module = (<ImportDeclaration>node).getModuleSpecifierValue();
                    let namedImports = (<ImportDeclaration>node).getNamedImports();
                    let defaultImport = (<ImportDeclaration>node).getDefaultImport();
                    let namespaceImport = (<ImportDeclaration>node).getNamespaceImport();
                    if (namedImports && namedImports.length > 0) {
                        namedImports.forEach(imp => {
                            let name = imp.getName();
                            let aliasNode = imp.getAliasNode();
                            let alias = undefined;
                            if (aliasNode) {
                                alias = aliasNode.getText();
                            }
                            let kind = ImportKind.NamedImport;
                            result.push({
                                name: name,
                                alias: alias,
                                module: module,
                                kind: kind
                            });
                        });
                    }
                    if (defaultImport) {
                        let name = defaultImport.getText();
                        let alias = undefined;
                        let kind = ImportKind.DefaultImport;
                        result.push({
                            name: name,
                            alias: alias,
                            module: module,
                            kind: kind
                        });
                    }
                    if (namespaceImport) {
                        let name = namespaceImport.getText();
                        let alias = undefined;
                        let kind = ImportKind.NamespaceImport;
                        result.push({
                            name: name,
                            alias: alias,
                            module: module,
                            kind: kind
                        });
                    }
                    break;
            }
        });
        if(result.length === 0) return undefined;
        return result;
    }
}


