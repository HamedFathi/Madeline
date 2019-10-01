import { FunctionInfo } from '../../../extractors/function/FunctionInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { summaryRouter } from './SummaryRouter';
import { PathInfo } from '../../../utilities/PathInfo';

export class FunctionSummaryMaker {
    public make(functions: FunctionInfo[], baseUrl?: string): SummaryDetailInfo[] {
        const functionsInfo: SummaryDetailInfo[] = [];
        for (const f of functions) {
            const pInfo: PathInfo = {
                path: f.path,
                file: f.file,
                directory: f.directory,
                extension: f.extension,
            };
            const mdFileName = f.name || f.id;
            const funcSummary = summaryRouter(pInfo, SummaryCategory.Functions, mdFileName, baseUrl);
            functionsInfo.push(funcSummary);
        }
        return functionsInfo;
    }
}
