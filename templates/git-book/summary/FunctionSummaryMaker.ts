import { FunctionInfo } from '../../../extractors/function/FunctionInfo';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeScope } from '../../../extractors/common/TypeScope';
import { PathInfo } from '../../../utilities/PathInfo';

export const functionSummaryMaker = function make(
    functions: FunctionInfo[],
    map: (id: string, pathInfo: PathInfo, category: TypeScope, mdFileName: string, baseUrl?: string) => SummaryMapInfo,
    baseUrl?: string,
): SummaryMapInfo[] {
    const functionsInfo: SummaryMapInfo[] = [];
    for (const f of functions) {
        const pInfo: PathInfo = {
            path: f.path,
            file: f.file,
            directory: f.directory,
            extension: f.extension,
        };
        const mdFileName = f.name || '_';
        const funcSummary = map(f.id, pInfo, TypeScope.Functions, mdFileName, baseUrl);
        functionsInfo.push(funcSummary);
    }
    return functionsInfo;
};
