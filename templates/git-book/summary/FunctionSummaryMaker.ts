import { FunctionInfo } from '../../../extractors/function/FunctionInfo';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { PathInfo } from '../../../utilities/PathInfo';

export const functionSummaryMaker = function make(
    functions: FunctionInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: TypeCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryMapInfo,
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
        const mdFileName = f.name || '_default';
        const funcSummary = map(f.id, pInfo, TypeCategory.Functions, mdFileName, baseUrl);
        funcSummary.node = f;
        functionsInfo.push(funcSummary);
    }
    return functionsInfo;
};
