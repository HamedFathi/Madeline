import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { summaryRouter } from './SummaryRouter';
import { PathInfo } from '../../../utilities/PathInfo';
import { EnumInfo } from '../../../extractors/enum/EnumInfo';

export class EnumSummaryMaker {
    public make(enums: EnumInfo[], baseUrl?: string): SummaryDetailInfo[] {
        const enumsInfo: SummaryDetailInfo[] = [];
        for (const e of enums) {
            const pInfo: PathInfo = {
                path: e.path,
                file: e.file,
                directory: e.directory,
                extension: e.extension,
            };
            const mdFileName = e.name + '.md';
            const enumSummary = summaryRouter(pInfo, SummaryCategory.Enums, mdFileName, baseUrl);
            enumsInfo.push(enumSummary);
        }
        return enumsInfo;
    }
}
