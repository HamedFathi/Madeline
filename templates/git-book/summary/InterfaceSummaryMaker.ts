import { InterfaceInfo } from '../../../extractors/interface/InterfaceInfo';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { PathInfo } from '../../../utilities/PathInfo';

export const interfaceSummaryMaker = function make(
    interfaces: InterfaceInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: TypeCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryMapInfo,
    baseUrl?: string,
): SummaryMapInfo[] {
    const interfacesInfo: SummaryMapInfo[] = [];
    for (const i of interfaces) {
        const pInfo: PathInfo = {
            path: i.path,
            file: i.file,
            directory: i.directory,
            extension: i.extension,
        };
        const mdFileName = i.name;
        const interfaceSummary = map(i.id, pInfo, TypeCategory.Interfaces, mdFileName, baseUrl);
        interfaceSummary.node = i;
        interfacesInfo.push(interfaceSummary);
    }
    return interfacesInfo;
};
