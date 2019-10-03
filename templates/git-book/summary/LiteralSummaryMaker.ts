import { LiteralInfo } from '../../../extractors/literal/LiteralInfo';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeScope } from '../../../extractors/common/TypeScope';
import { PathInfo } from '../../../utilities/PathInfo';
export const literalSummaryMaker = function make(
    literals: LiteralInfo[],
    map: (id: string, pathInfo: PathInfo, category: TypeScope, mdFileName: string, baseUrl?: string) => SummaryMapInfo,
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
        const literalSummary = map(l.id, pInfo, TypeScope.Literals, mdFileName, baseUrl);
        literalsInfo.push(literalSummary);
    }
    return literalsInfo;
};
