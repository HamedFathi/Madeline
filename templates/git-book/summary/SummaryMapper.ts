import { PathInfo } from '../../../utilities/PathInfo';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';

export const summaryMapper = function (
    id: string,
    pathInfo: PathInfo,
    category: TypeCategory,
    mdFileName: string,
    baseUrl?: string,
): SummaryMapInfo {

    let folders: string[] = [];
    if (pathInfo.directory.includes('@aurelia') && pathInfo.directory.includes('dist')) {
        let dir = pathInfo.directory.substr(pathInfo.directory.lastIndexOf('@aurelia'));
        folders = dir
            .split('@aurelia')[1]
            .split('/')
            .filter(x => x !== '' && x !== 'dist')
            .map(x => x.toLowerCase());
    }
    if (pathInfo.directory.includes('packages') && pathInfo.directory.includes('src')) {
        let dir = pathInfo.directory.substr(pathInfo.directory.lastIndexOf('packages'));
        folders = dir
            .split('packages')[1]
            .split('/')
            .filter(x => x !== '' && x !== 'src')
            .map(x => x.toLowerCase());
    }



    const summaryInfo: SummaryMapInfo = {
        id: id,
        category: category,
        folders: folders,
        sourceFileName: pathInfo.file.toLowerCase(),
        mdFileName: mdFileName,
        baseUrl: baseUrl,
        path: '',
    };
    const path = [
        summaryInfo.baseUrl,
        ...summaryInfo.folders,
        summaryInfo.sourceFileName,
        summaryInfo.category.toString().toLowerCase(),
        summaryInfo.mdFileName.toLowerCase(),
    ];
    summaryInfo.path = path.filter(x => x !== '').join('/');
    return summaryInfo;
};
