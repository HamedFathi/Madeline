import { TypeMapInfo } from './TypeMapInfo';
import { TemplateOptions } from './../../../TemplateOptions';
import { TypeInfo } from '../../../../extractors/common/TypeInfo';
import { PathInfo } from '../../../../utilities/PathInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeScope } from '../../../../extractors/common/TypeScope';

export class TypeToMdConverter {
    public convert(
        id: string,
        typeInfo: TypeInfo,
        map: (id: string, from: FromTypeInfo[], baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string {
        if (typeInfo.from) {
            const typeMapInfo = map(id, typeInfo.from, baseUrl);
        } else {

        }
        return '';
    }
}
