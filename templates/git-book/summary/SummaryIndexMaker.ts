import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { ExportedSourceFileInfo } from '../../../extractors/source-file/ExportedSourceFileInfo';
import { SummaryInfo } from './SummaryInfo';
import { SummaryMaker } from './SummaryMaker';

export class SummaryIndexMaker {
    constructor(private summaryMaker = new SummaryMaker()) {}
    public make(
        sourceFile: ExportedSourceFileInfo,
        map: (
            id: string,
            pathInfo: PathInfo,
            category: TypeCategory,
            mdFileName: string,
            baseUrl?: string,
        ) => SummaryMapInfo,
        baseUrl?: string,
    ): SummaryInfo[] {
        const summaries = this.summaryMaker.make(sourceFile, map, '', baseUrl);
        return [];
    }
}
