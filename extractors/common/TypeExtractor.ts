import { TypeDetailInfo } from './TypeDetailInfo';
import { StringUtils } from '../../utilities/StringUtils';
import { TypeInfo } from './TypeInfo';
import { Type, TypeNode } from 'ts-morph';

export class TypeExtractor {
    private readonly stringUtils = new StringUtils();
    public extract(type: Type, typeNode?: TypeNode): TypeInfo {
        let finalText = '';
        const text = type.getText();
        const typeNodeText = typeNode === undefined ? undefined : typeNode.getText();
        const details: TypeDetailInfo[] = [];
        const regex = /import\((.+)\).(.+\.)?(.*)/;
        const match = text
            .split('import')
            .filter(x => !this.stringUtils.isEmptyOrWhitespace(x))
            .map(y => 'import' + y);
        if (match) {
            match.forEach(m => {
                const info = regex.exec(m);
                if (info) {
                    const importedFrom: string = new StringUtils().removeFirstAndLastQuote((info[1] as string).trim());
                    finalText += info[3] as string;
                    const name: string = (info[3] as string)
                        .replace('<', '')
                        .replace('>', '')
                        .trim();
                    const preType: string | undefined =
                        info[2] === undefined ? undefined : (info[2] as string).replace('.', '');
                    details.push({
                        importedFrom: importedFrom,
                        name: name,
                        preType: preType,
                        text: m
                            .replace('<', '')
                            .replace('>', '')
                            .trim(),
                    });
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
}
