import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { ExportedSourceFileInfo } from '../../../extractors/source-file/ExportedSourceFileInfo';
import { SummaryInfo } from './SummaryInfo';
import { SummaryMaker } from './SummaryMaker';
import * as _ from 'lodash';
import { isIP } from 'net';

export class SummaryIndexMaker {
    constructor(private summaryMaker = new SummaryMaker()) { }
    public make(
        sourceFile: ExportedSourceFileInfo,
        map: (
            id: string,
            pathInfo: PathInfo,
            category: TypeCategory,
            mdFileName: string,
            baseUrl?: string,
        ) => SummaryMapInfo,
        baseUrl: string,
    ): SummaryInfo[] {
        return [];
    }
}
