import { InterfaceInfo } from '../../../extractors/interface/InterfaceInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { summaryRouter } from './SummaryRouter';

export class InterfaceSummaryMaker {
    public make(interfaces: InterfaceInfo[], baseUrl?: string): SummaryDetailInfo[] {
        const interfacesInfo: SummaryDetailInfo[] = [];
        for (const f of interfaces) {
            const pInfo: PathInfo = {
                path: f.path,
                file: f.file,
                directory: f.directory,
                extension: f.extension,
            };
            const mdFileName = f.name;
            const interfaceSummary = summaryRouter(f.id,pInfo, SummaryCategory.Interfaces, mdFileName, baseUrl);
            interfacesInfo.push(interfaceSummary);
        }
        return interfacesInfo;
    }
}
