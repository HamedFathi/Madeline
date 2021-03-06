import { LiteralInfo } from '../../../extractors/literal/LiteralInfo';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { PathInfo } from '../../../utilities/PathInfo';
export const literalSummaryMaker = function make(
    literals: LiteralInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: TypeCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryMapInfo,
    baseUrl?: string,
): SummaryMapInfo[] {
    const literalsInfo: SummaryMapInfo[] = [];
    for (const l of literals) {
        const pInfo: PathInfo = {
            path: l.path,
            file: l.file,
            directory: l.directory,
            extension: l.extension,
        };
        const mdFileName = l.name;
        const literalSummary = map(l.id, pInfo, TypeCategory.Literals, mdFileName, baseUrl);
        literalSummary.node = l;
        literalsInfo.push(literalSummary);
    }
    return literalsInfo;
};
