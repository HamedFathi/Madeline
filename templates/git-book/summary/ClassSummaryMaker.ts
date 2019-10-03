import { SourceFileClassInfo } from '../../../extractors/source-file/SourceFileClassInfo';
import { PathInfo } from '../../../utilities/PathInfo';
import { summaryRouter } from './SummaryRouter';
import { SummaryCategory } from './SummaryCategory';
import { SummaryDetailInfo } from './SummaryDetailInfo';
export class ClassSummaryMaker {
    public make(classes: SourceFileClassInfo[], baseUrl?: string): SummaryDetailInfo[] {
        const classSummaryInfo: SummaryDetailInfo[] = [];
        for (const c of classes) {
            const pInfo: PathInfo = {
                path: c.path,
                file: c.file,
                directory: c.directory,
                extension: c.extension,
            };
            const mdFileName = c.name || c.id;
            const classSummary = summaryRouter(c.id,pInfo, SummaryCategory.Classes, mdFileName, baseUrl);
            classSummaryInfo.push(classSummary);
        }
        return classSummaryInfo;
    }
}
