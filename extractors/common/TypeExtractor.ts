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
        let value = '';
        const regex = /import\((.+?)\)\./gm;
        const text = type.getText();
        const typeNodeText = typeNode === undefined ? undefined : typeNode.getText();
        const importedFrom: string[] = [];
        let typeImports: TypeImportInfo[] = [];
        const allImports = text.match(regex);
        let x: string[] = [];
        // Priorities
        // 1. typeReference
        // 2. typeNodeText
        // 3. text
        if (typeReference) {
            value = typeReference;
        }
        else if (typeNodeText) {
            value = typeNodeText;
        }
        else {
            value = text.replace(regex, '');
        }
        if (allImports) {
            allImports.forEach(imp => {
                if (!importedFrom.includes(imp)) {
                    importedFrom.push(imp.replace('import(', '').replace(').', ''));
                }
            });
            if (imports) {
                typeImports = this.getRelatedImports(value, imports);
            }
        }
        return {
            value: value,
            text: text,
            typeNodeText: typeNodeText,
            importedFrom: importedFrom.length === 0 ? undefined : importedFrom,
            typeReference: typeReference,
            imports: typeImports.length === 0 ? undefined : typeImports
        };
    }

    private isThirdPartyLibrary(text: string): boolean {
        return !text.startsWith('.');
    }

    private getRelatedImports(value: string, imports: ImportInfo[]): TypeImportInfo[] {
        let typeImports: TypeImportInfo[] = [];
        let values = this.splitValue(value).length === 0 ? [value] : this.splitValue(value);
        values.forEach(item => {
            let result = imports.filter(x => x.alias == item);
            if (result.length === 0) {
                result = imports.filter(x => x.name == item);
            }
            if (result.length > 0) {
                result.forEach(item => {
                    typeImports.push({
                        isThirdParty: this.isThirdPartyLibrary(item.module),
                        alias: item.alias,
                        kind: item.kind,
                        kindName: item.kindName,
                        module: item.module,
                        name: item.name,
                        text: item.text
                    });
                });
            }
        });
        return typeImports;
    }

    private splitValue(value: string): string[] {
        let result = value
            .replace(/\(/g, ' ')
            .replace(/\)/g, ' ')
            .replace(/\./g, ' ')
            .replace(/\[/g, ' ')
            .replace(/\]/g, ' ')
            .replace(/\</g, ' ')
            .replace(/\>/g, ' ')
            .replace(/\,/g, ' ')
            .replace(/\{/g, ' ')
            .replace(/\}/g, ' ')
            .replace(/\:/g, ' ')
            .replace(/\'/g, ' ')
            .replace(/\|/g, ' ')
            .replace(/\"/g, ' ')
            .replace(/\;/g, ' ')
            .replace(/\s\s+/g, ' ')
            .split(' ')
            .map(x => x.trim())
            .filter(x => x.length !== 0)
            ;
        return result;
    }
}
