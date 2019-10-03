import { FunctionInfo } from '../../../extractors/function/FunctionInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';

export const functionSummaryMaker = function make(
    functions: FunctionInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: SummaryCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryDetailInfo,
    baseUrl?: string,
): SummaryDetailInfo[] {
    const functionsInfo: SummaryDetailInfo[] = [];
    for (const f of functions) {
        const pInfo: PathInfo = {
            path: f.path,
            file: f.file,
            directory: f.directory,
            extension: f.extension,
        };
        const mdFileName = f.name || '_';
        const funcSummary = map(f.id, pInfo, SummaryCategory.Functions, mdFileName, baseUrl);
        functionsInfo.push(funcSummary);
    }
    return functionsInfo;
};
