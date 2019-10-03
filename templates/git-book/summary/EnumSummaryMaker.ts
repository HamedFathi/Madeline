import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { EnumInfo } from '../../../extractors/enum/EnumInfo';

export const enumSummaryMaker = function make(
    enums: EnumInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: SummaryCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryDetailInfo,
    baseUrl?: string,
): SummaryDetailInfo[] {
    const enumsInfo: SummaryDetailInfo[] = [];
    for (const e of enums) {
        const pInfo: PathInfo = {
            path: e.path,
            file: e.file,
            directory: e.directory,
            extension: e.extension,
        };
        const mdFileName = e.name;
        const enumSummary = map(e.id, pInfo, SummaryCategory.Enums, mdFileName, baseUrl);
        enumsInfo.push(enumSummary);
    }
    return enumsInfo;
};
