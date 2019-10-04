import { DestructuringInfo } from '../../../extractors/destructuring/DestructuringInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { SummaryMapInfo } from './SummaryMapInfo';
import { PathInfo } from '../../../utilities/PathInfo';
export const destructuringSummaryMaker = function make(
    destructuring: DestructuringInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: TypeCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryMapInfo,
    baseUrl?: string,
): SummaryMapInfo[] {
    const destructions: SummaryMapInfo[] = [];
    for (const d of destructuring) {
        const pInfo: PathInfo = {
            path: d.path,
            file: d.file,
            directory: d.directory,
            extension: d.extension,
        };
        const mdFileName = '_';
        const destructuringSummary = map(d.id, pInfo, TypeCategory.Destructuring, mdFileName, baseUrl);
        destructions.push(destructuringSummary);
    }
    return destructions;
};
