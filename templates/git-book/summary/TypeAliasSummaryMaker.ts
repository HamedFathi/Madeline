import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { summaryRouter } from './SummaryRouter';
import { TypeAliasInfo } from '../../../extractors/type-alias/TypeAliasInfo';

export class TypeAliasSummaryMaker {
    public make(typeAliases: TypeAliasInfo[], baseUrl?: string): SummaryDetailInfo[] {
        const aliasInfo: SummaryDetailInfo[] = [];
        for (const ta of typeAliases) {
            const pInfo: PathInfo = {
                path: ta.path,
                file: ta.file,
                directory: ta.directory,
                extension: ta.extension,
            };
            const mdFileName = ta.name + '.md';
            const aliasSummary = summaryRouter(pInfo, SummaryCategory.TypeAliases, mdFileName, baseUrl);
            aliasInfo.push(aliasSummary);
        }
        return aliasInfo;
    }
}
