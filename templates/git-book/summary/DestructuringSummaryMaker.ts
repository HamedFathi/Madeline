import { DestructuringInfo } from '../../../extractors/destructuring/DestructuringInfo';
import { SummaryCategory } from './SummaryCategory';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { PathInfo } from '../../../utilities/PathInfo';
export const destructuringSummaryMaker = function make(
    destructuring: DestructuringInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: SummaryCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryDetailInfo,
    baseUrl?: string,
): SummaryDetailInfo[] {
    const destructions: SummaryDetailInfo[] = [];
    for (const d of destructuring) {
        const pInfo: PathInfo = {
            path: d.path,
            file: d.file,
            directory: d.directory,
            extension: d.extension,
        };
        const mdFileName = '_';
        const destructuringSummary = map(d.id, pInfo, SummaryCategory.Destructuring, mdFileName, baseUrl);
        destructions.push(destructuringSummary);
    }
    return destructions;
};
