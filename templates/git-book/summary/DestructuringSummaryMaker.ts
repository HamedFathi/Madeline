import { DestructuringInfo } from '../../../extractors/destructuring/DestructuringInfo';
import { SummaryCategory } from './SummaryCategory';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { summaryRouter } from './SummaryRouter';
import { PathInfo } from '../../../utilities/PathInfo';
export class DestructuringSummaryMaker {
    public make(destructuring: DestructuringInfo[], baseUrl?: string): SummaryDetailInfo[] {
        const destructions: SummaryDetailInfo[] = [];
        for (const d of destructuring) {
            const pInfo: PathInfo = {
                path: d.path,
                file: d.file,
                directory: d.directory,
                extension: d.extension,
            };
            const mdFileName = d.id;
            const destructuringSummary = summaryRouter(pInfo, SummaryCategory.Destructuring, mdFileName, baseUrl);
            destructions.push(destructuringSummary);
        }
        return destructions;
    }
}
