import { VariableInfo } from '../../../extractors/variable/VariableInfo';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeScope } from '../../../extractors/common/TypeScope';
import { PathInfo } from '../../../utilities/PathInfo';
export const variableSummaryMaker = function make(
    variables: VariableInfo[],
    map: (id: string, pathInfo: PathInfo, category: TypeScope, mdFileName: string, baseUrl?: string) => SummaryMapInfo,
    baseUrl?: string,
): SummaryMapInfo[] {
    const variablesInfo: SummaryMapInfo[] = [];
    for (const v of variables) {
        const pInfo: PathInfo = {
            path: v.path,
            file: v.file,
            directory: v.directory,
            extension: v.extension,
        };
        const mdFileName = v.name;
        const variableSummary = map(v.id, pInfo, TypeScope.Variables, mdFileName, baseUrl);
        variablesInfo.push(variableSummary);
    }
    return variablesInfo;
};
