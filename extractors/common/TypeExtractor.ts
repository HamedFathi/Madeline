import { TypeInfo } from './TypeInfo';
import { Type, TypeNode } from 'ts-morph';
import { ImportInfo } from '../import/ImportInfo';
import { TypeImportInfo } from './TypeImportInfo';

export class TypeExtractor {
    public extract(
        type: Type,
        typeNode: TypeNode | undefined,
        typeReference: string | undefined,
        imports: ImportInfo[] | undefined,
    ): TypeInfo {
        const regex = /import\((.+?)\)\./gm;
        const text = type.getText();
        const typeNodeText = typeNode === undefined ? undefined : typeNode.getText();
        const importedFrom: string[] = [];
        const allImports = text.match(regex);
        if (allImports) {
            allImports.forEach(imp => {
                importedFrom.push(imp.replace('import(', '').replace(').', ''));
            });
        }
        return {
            value: text,
            text: text,
            typeNodeText: typeNodeText,
            importedFrom: importedFrom.length === 0 ? undefined : importedFrom,
            typeReference: typeReference,
            imports: undefined,
        };
    }

    private isThirdPartyLibrary(text: string): boolean {
        return text.startsWith('.');
    }
}
