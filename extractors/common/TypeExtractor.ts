import { TypeInfo } from './TypeInfo';
import { Type, TypeNode } from 'ts-morph';
import { ImportInfo } from '../import/ImportInfo';

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
                importedFrom.push(imp.replace('import(','').replace(').',''));
            });
        }
        return {
            type: text,
            text: text,
            typeNodeText: typeNodeText,
            importedFrom: importedFrom.length === 0 ? undefined : importedFrom,
            typeReference: typeReference,
        };
    }

    /*
    private readonly stringUtils = new StringUtils();
    public extract(type: Type, typeNode?: TypeNode): TypeInfo {
        let finalText = '';
        const text = type.getText();
        const typeNodeText = typeNode === undefined ? undefined : typeNode.getText();
        const details: TypeDetailInfo[] = [];
        const regex = /import\((.+)\).(.*)/;
        const match = text
            .split('import')
            .filter(x => !this.stringUtils.isEmptyOrWhitespace(x))
            .map(y => y.replace('(', 'import('));
        if (match) {
            match.forEach(m => {
                const info = regex.exec(m);
                if (info) {
                    const importedFrom: string = new StringUtils().removeFirstAndLastQuote((info[1] as string).trim());
                    const text = (info[2] as string).split('.');
                    finalText += text[text.length - 1];
                    const name: string = text[text.length - 1]
                        .replace('<', '')
                        .replace('>', '')
                        .trim();
                    const preType: string | undefined =
                        text.length <= 1
                            ? undefined
                            : (info[2] as string).substring(0, (info[2] as string).lastIndexOf('.'));
                    details.push({
                        importedFrom: importedFrom,
                        name: name,
                        preType: preType,
                        text: m
                            .replace('<', '')
                            .replace('>', '')
                            .trim(),
                    });
                } else {
                    finalText += m;
                }
            });
            return {
                text: this.stringUtils.isEmptyOrWhitespace(finalText) ? text : finalText,
                fullText: text,
                details: details.length === 0 ? undefined : details,
                typeNodeText: typeNodeText,
            };
        } else {
            return {
                text: text,
                fullText: text,
                details: undefined,
                typeNodeText: typeNodeText,
            };
        }
    }
    */
}
