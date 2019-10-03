import { VariableInfo } from '../../../extractors/variable/VariableInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { summaryRouter } from './SummaryRouter';
import { PathInfo } from '../../../utilities/PathInfo';
export const variableSummaryMaker = function make(
    variables: VariableInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: SummaryCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryDetailInfo = summaryRouter,
    baseUrl?: string,
): SummaryDetailInfo[] {
    const variablesInfo: SummaryDetailInfo[] = [];
    for (const v of variables) {
        const pInfo: PathInfo = {
            path: v.path,
            file: v.file,
            directory: v.directory,
            extension: v.extension,
        };
        const mdFileName = v.name;
        const variableSummary = map(v.id, pInfo, SummaryCategory.Variables, mdFileName, baseUrl);
        variablesInfo.push(variableSummary);
    }
    return variablesInfo;
};
