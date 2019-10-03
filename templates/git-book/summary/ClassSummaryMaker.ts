import { SourceFileClassInfo } from '../../../extractors/source-file/SourceFileClassInfo';
import { PathInfo } from '../../../utilities/PathInfo';
import { TypeScope } from '../../../extractors/common/TypeScope';
import { SummaryMapInfo } from './SummaryMapInfo';
export const classSummaryMaker = function make(
    classes: SourceFileClassInfo[],
    map: (id: string, pathInfo: PathInfo, category: TypeScope, mdFileName: string, baseUrl?: string) => SummaryMapInfo,
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
        const mdFileName = c.name || '_';
        const classSummary = map(c.id, pInfo, TypeScope.Classes, mdFileName, baseUrl);
        classSummaryInfo.push(classSummary);
    }
    return classSummaryInfo;
};
