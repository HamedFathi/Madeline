import { LiteralInfo } from '../../../extractors/literal/LiteralInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { summaryRouter } from './SummaryRouter';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';
export class LiteralSummaryMaker {
    public make(literals: LiteralInfo[], baseUrl?: string): SummaryDetailInfo[] {
        const literalsInfo: SummaryDetailInfo[] = [];
        for (const l of literals) {
            const pInfo: PathInfo = {
                path: l.path,
                file: l.file,
                directory: l.directory,
                extension: l.extension,
            };
            const mdFileName = l.name;
            const literalSummary = summaryRouter(l.id,pInfo, SummaryCategory.Literals, mdFileName, baseUrl);
            literalsInfo.push(literalSummary);
        }
        return literalsInfo;
    }
}
