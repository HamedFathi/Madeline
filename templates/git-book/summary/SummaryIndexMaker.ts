import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { ExportedSourceFileInfo } from '../../../extractors/source-file/ExportedSourceFileInfo';
import { SummaryInfo } from './SummaryInfo';
import { SummaryMaker } from './SummaryMaker';
import * as _ from 'lodash';
import { isIP } from 'net';

export class SummaryIndexMaker {
    constructor(private summaryMaker = new SummaryMaker()) {}

    private groupBy(array: SummaryInfo[], func : (x:SummaryInfo)=> unknown[]) {
        const groups: any = {};
        array.forEach(function(o) {
            const group = JSON.stringify(func(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function(group) {
            return groups[group];
        });
    }

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

        let data = this.summaryMaker.make(sourceFile,map,'',baseUrl);
        //let y = this.groupBy(data, x => [x.level,x.title,x.]
        return [];
    }
}
