import { TemplateOptions } from '../../TemplateOptions';
import { TypeInfo } from '../../../extractors/common/TypeInfo';
import { TypeRoutes } from './TypeRoutes';
import { ImportInfo } from '../../../extractors/import/ImportInfo';

export class TypeToMdConverter {
    public convert(
        typeInfo: TypeInfo,
        importsInfo: ImportInfo[],
        typeRoutes?: TypeRoutes[],
        option?: TemplateOptions,
    ): string {
        /*if (typeInfo.details) {
            typeInfo.details.forEach(detail => {
                const imports = importsInfo.filter(x => x.name === detail.name);
                if (imports.length > 0) {
                }
            });
        } else {
            return typeInfo.typeNodeText || typeInfo.text;
        }*/
        return '';
    }

    private isThirdPartyLibrary(text: string): boolean {
        return text.startsWith('.');
    }
}
