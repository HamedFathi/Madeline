import { SourceFileClassInfo } from '../../../extractors/source-file/SourceFileClassInfo';
import { PathInfo } from '../../../utilities/PathInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { SummaryMapInfo } from './SummaryMapInfo';
export const classSummaryMaker = function make(
    classes: SourceFileClassInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: TypeCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryMapInfo,
    baseUrl?: string,
): SummaryMapInfo[] {
    const classSummaryInfo: SummaryMapInfo[] = [];
    for (const c of classes) {
        const pInfo: PathInfo = {
            path: c.path,
            file: c.file,
            directory: c.directory,
            extension: c.extension,
        };
        const mdFileName = c.name || '?';
        const classSummary = map(c.id, pInfo, TypeCategory.Classes, mdFileName, baseUrl);
        classSummaryInfo.push(classSummary);
    }
    return classSummaryInfo;
};
