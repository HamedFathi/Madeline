import { TypeDetailInfo } from "./TypeDetailInfo";
import { StringUtils } from '../../utilities/StringUtils';
import { TypeInfo } from './TypeInfo';

export class TypeExtractor {
    private readonly stringUtils = new StringUtils();
    public extract(text: string): TypeInfo {
        let finalText = '';
        let details: TypeDetailInfo[] = [];
        const regex = /import\((.+)\).(.+\.)?(.*)/;
        let match = text.split('import').filter(x => !this.stringUtils.isEmptyOrWhitespace(x)).map(y => 'import' + y);
        if (match) {
            match.forEach(m => {
                const info = regex.exec(m);
                if (info) {
                    const importedFrom: string = new StringUtils().removeFirstAndLastQuote((info[1] as string).trim());
                    finalText += info[3] as string;
                    const name: string = (info[3] as string).replace('<', '').replace('>', '').trim();
                    const preType: string | undefined =
                        info[2] === undefined ? undefined : (info[2] as string).replace('.', '');
                    details.push({
                        importedFrom: importedFrom,
                        name: name,
                        preType: preType,
                        text: m.replace('<', '').replace('>', '').trim()
                    })
                }
            });
            return {
                text: this.stringUtils.isEmptyOrWhitespace(finalText) ? text : finalText,
                fullText: text,
                details: details.length === 0 ? undefined : details
            };
        } else {
            return {
                text: text,
                fullText: text,
                details: undefined
            };
        }
    }
}
