import { SyntaxKind, ImportDeclaration, SourceFile, ImportEqualsDeclaration } from 'ts-morph';
import { ImportInfo } from './ImportInfo';
import { ImportKind } from './ImportKind';
import { prettify } from '../../utilities/PrettierUtils';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';

export class ImportExtractor {
    public extract(sourceFile: SourceFile): ImportInfo[] | undefined {
        const result: ImportInfo[] = [];
        sourceFile.forEachDescendant(node => {
            const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
            switch (node.getKind()) {
                case SyntaxKind.ImportDeclaration:
                    const importDeclaration = node as ImportDeclaration;
                    const textDeclaration = prettify(importDeclaration.getFullText());
                    const moduleValue = importDeclaration.getModuleSpecifierValue();
                    const namedImports = importDeclaration.getNamedImports();
                    const defaultImport = importDeclaration.getDefaultImport();
                    const namespaceImport = importDeclaration.getNamespaceImport();
                    if (namedImports && namedImports.length > 0) {
                        namedImports.forEach(imp => {
                            const name = imp.getName();
                            const aliasNode = imp.getAliasNode();
                            let alias: string | undefined = void 0;
                            if (aliasNode) {
                                alias = aliasNode.getText();
                            }
                            const kind = ImportKind.NamedImport;
                            result.push({
                                id: getSha256(textDeclaration + pathInfo.path),
                                name: name,
                                alias: alias,
                                module: moduleValue,
                                kind: kind,
                                kindName: ImportKind[kind],
                                text: textDeclaration,
                                path: pathInfo.path,
                                directory: pathInfo.directory,
                                file: pathInfo.file,
                                extension: pathInfo.extension,
                            });
                        });
                    }
                    if (defaultImport) {
                        const name = defaultImport.getText();
                        const alias = void 0;
                        const kind = ImportKind.DefaultImport;
                        result.push({
                            id: getSha256(textDeclaration + pathInfo.path),
                            name: name,
                            alias: alias,
                            module: moduleValue,
                            kind: kind,
                            kindName: ImportKind[kind],
                            text: textDeclaration,
                            path: pathInfo.path,
                            directory: pathInfo.directory,
                            file: pathInfo.file,
                            extension: pathInfo.extension,
                        });
                    }
                    if (namespaceImport) {
                        const name = namespaceImport.getText();
                        const alias = void 0;
                        const kind = ImportKind.NamespaceImport;
                        result.push({
                            id: getSha256(textDeclaration + pathInfo.path),
                            name: name,
                            alias: alias,
                            module: moduleValue,
                            kind: kind,
                            kindName: ImportKind[kind],
                            text: textDeclaration,
                            path: pathInfo.path,
                            directory: pathInfo.directory,
                            file: pathInfo.file,
                            extension: pathInfo.extension,
                        });
                    }
                    break;
                case SyntaxKind.ImportEqualsDeclaration:
                    const importEquals = node as ImportEqualsDeclaration;
                    const moduleRefValue = importEquals.getModuleReference().getText();
                    const text = prettify(importEquals.getFullText());
                    const name = importEquals.getName();
                    const kind = ImportKind.ImportEquals;
                    result.push({
                        id: getSha256(text + pathInfo.path),
                        name: name,
                        alias: void 0,
                        module: moduleRefValue,
                        kind: kind,
                        kindName: ImportKind[kind],
                        text: text,
                        path: pathInfo.path,
                        directory: pathInfo.directory,
                        file: pathInfo.file,
                        extension: pathInfo.extension,
                    });
                    break;
            }
        });
        if (result.length === 0) return void 0;
        return result;
    }
}
