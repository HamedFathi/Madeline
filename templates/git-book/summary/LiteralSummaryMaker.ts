import { LiteralInfo } from '../../../extractors/literal/LiteralInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';
export const literalSummaryMaker = function make(
    literals: LiteralInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: SummaryCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryDetailInfo,
    baseUrl?: string,
): SummaryDetailInfo[] {
    const literalsInfo: SummaryDetailInfo[] = [];
    for (const l of literals) {
        const pInfo: PathInfo = {
            path: l.path,
            file: l.file,
            directory: l.directory,
            extension: l.extension,
        };
        const mdFileName = l.name;
        const literalSummary = map(l.id, pInfo, SummaryCategory.Literals, mdFileName, baseUrl);
        literalsInfo.push(literalSummary);
    }
    return literalsInfo;
};
