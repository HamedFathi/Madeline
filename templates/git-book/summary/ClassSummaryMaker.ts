import { SourceFileClassInfo } from '../../../extractors/source-file/SourceFileClassInfo';
import { PathInfo } from '../../../utilities/PathInfo';
import { SummaryCategory } from './SummaryCategory';
import { SummaryDetailInfo } from './SummaryDetailInfo';
export const classSummaryMaker = function make(
    classes: SourceFileClassInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: SummaryCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryDetailInfo,
    baseUrl?: string,
): SummaryDetailInfo[] {
    const classSummaryInfo: SummaryDetailInfo[] = [];
    for (const c of classes) {
        const pInfo: PathInfo = {
            path: c.path,
            file: c.file,
            directory: c.directory,
            extension: c.extension,
        };
        const mdFileName = c.name || '_';
        const classSummary = map(c.id, pInfo, SummaryCategory.Classes, mdFileName, baseUrl);
        classSummaryInfo.push(classSummary);
    }
    return classSummaryInfo;
};
