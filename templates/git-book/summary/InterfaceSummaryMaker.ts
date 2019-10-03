import { InterfaceInfo } from '../../../extractors/interface/InterfaceInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';

export const interfaceSummaryMaker = function make(
    interfaces: InterfaceInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: SummaryCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryDetailInfo,
    baseUrl?: string,
): SummaryDetailInfo[] {
    const interfacesInfo: SummaryDetailInfo[] = [];
    for (const f of interfaces) {
        const pInfo: PathInfo = {
            path: f.path,
            file: f.file,
            directory: f.directory,
            extension: f.extension,
        };
        const mdFileName = f.name;
        const interfaceSummary = map(f.id, pInfo, SummaryCategory.Interfaces, mdFileName, baseUrl);
        interfacesInfo.push(interfaceSummary);
    }
    return interfacesInfo;
};
