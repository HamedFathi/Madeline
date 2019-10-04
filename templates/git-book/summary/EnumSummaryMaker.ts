import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { EnumInfo } from '../../../extractors/enum/EnumInfo';

export const enumSummaryMaker = function make(
    enums: EnumInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: TypeCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryMapInfo,
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
        const enumSummary = map(e.id, pInfo, TypeCategory.Enums, mdFileName, baseUrl);
        enumsInfo.push(enumSummary);
    }
    return enumsInfo;
};
