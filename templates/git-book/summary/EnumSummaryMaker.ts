import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeScope } from '../../../extractors/common/TypeScope';
import { PathInfo } from '../../../utilities/PathInfo';
import { EnumInfo } from '../../../extractors/enum/EnumInfo';

export const enumSummaryMaker = function make(
    enums: EnumInfo[],
    map: (id: string, pathInfo: PathInfo, category: TypeScope, mdFileName: string, baseUrl?: string) => SummaryMapInfo,
    baseUrl?: string,
): SummaryMapInfo[] {
    const enumsInfo: SummaryMapInfo[] = [];
    for (const e of enums) {
        const pInfo: PathInfo = {
            path: e.path,
            file: e.file,
            directory: e.directory,
            extension: e.extension,
        };
        const mdFileName = e.name;
        const enumSummary = map(e.id, pInfo, TypeScope.Enums, mdFileName, baseUrl);
        enumsInfo.push(enumSummary);
    }
    return enumsInfo;
};
