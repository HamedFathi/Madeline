import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeScope } from '../../../extractors/common/TypeScope';
import { PathInfo } from '../../../utilities/PathInfo';
import { TypeAliasInfo } from '../../../extractors/type-alias/TypeAliasInfo';

export const typeAliasSummaryMaker = function make(
    typeAliases: TypeAliasInfo[],
    map: (id: string, pathInfo: PathInfo, category: TypeScope, mdFileName: string, baseUrl?: string) => SummaryMapInfo,
    baseUrl?: string,
): SummaryMapInfo[] {
    const aliasInfo: SummaryMapInfo[] = [];
    for (const ta of typeAliases) {
        const pInfo: PathInfo = {
            path: ta.path,
            file: ta.file,
            directory: ta.directory,
            extension: ta.extension,
        };
        const mdFileName = ta.name;
        const aliasSummary = map(ta.id, pInfo, TypeScope.TypeAliases, mdFileName, baseUrl);
        aliasInfo.push(aliasSummary);
    }
    return aliasInfo;
};
