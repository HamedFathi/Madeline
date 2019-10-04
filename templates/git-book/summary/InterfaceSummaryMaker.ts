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
    for (const f of interfaces) {
        const pInfo: PathInfo = {
            path: f.path,
            file: f.file,
            directory: f.directory,
            extension: f.extension,
        };
        const mdFileName = f.name;
        const interfaceSummary = map(f.id, pInfo, TypeCategory.Interfaces, mdFileName, baseUrl);
        interfacesInfo.push(interfaceSummary);
    }
    return interfacesInfo;
};
