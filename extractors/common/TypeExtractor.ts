import { TypeInfo } from './TypeInfo';
import { Type, TypeNode } from 'ts-morph';
import { FromTypeInfo } from './FromTypeInfo';
import { StringUtils } from '../../utilities/StringUtils';

export class TypeExtractor {
    public extract(type: Type, typeNode: TypeNode | undefined, typeReference: string | undefined): TypeInfo {
        const stringUtils = new StringUtils();
        let value = '';
        const regex = /import\((.+?)\)\.([^;>,\[\]\)\(<{}&!]+)/gm;
        const text = type.getText();
        const typeNodeText = typeNode === undefined ? undefined : typeNode.getText();
        const fromAll: FromTypeInfo[] = [];
        const allImports = text.match(regex);
        // Priorities
        // 1. typeReference
        // 2. typeNodeText
        // 3. text
        if (typeReference) {
            value = typeReference;
        } else if (typeNodeText) {
            value = typeNodeText;
        } else {
            value = text.replace(regex, '');
        }
        if (allImports) {
            allImports.forEach(imp => {
                const rgx = /import\((.+?)\)\.(.+)/g;
                const groups = rgx.exec(imp);
                if (groups) {
                    const gr0: string = stringUtils.removeFirstAndLastQuote(groups[0] as string);
                    const gr1: string = stringUtils.removeFirstAndLastQuote(groups[1] as string);
                    const gr2: string = stringUtils.removeFirstAndLastQuote(groups[2] as string);
                    const dir: string = gr1.substring(0, gr1.lastIndexOf('/'));
                    const file: string = gr1.replace(dir, '').substring(1);
                    const from: FromTypeInfo = {
                        import: gr0,
                        path: gr1,
                        type: gr2,
                        directory: dir,
                        file: file,
                    };
                    const isIncluded = fromAll.filter(x => x.import === gr0).length > 0;
                    if (!isIncluded) {
                        fromAll.push(from);
                    }
                }
            });
        }
        return {
            value: value,
            text: text,
            typeNodeText: typeNodeText,
            typeReference: typeReference,
            from: fromAll.length === 0 ? undefined : fromAll,
        };
    }
}
