import { PathInfo } from '../../../utilities/PathInfo';
import { SummaryInfo } from './SummaryInfo';

export const summaryRouter = function(
    pathInfo: PathInfo,
    category: string,
    mdFileName: string,
    baseUrl?: string,
): SummaryInfo {
    const folders = pathInfo.directory
        .split('packages')[1]
        .split('/')
        .filter(x => x !== '' && x !== 'src')
        .map(x => x.toLowerCase());

    const summaryInfo: SummaryInfo = {
        category: category,
        folders: folders,
        sourceFileName: pathInfo.file,
        mdFileName: mdFileName,
        baseUrl: baseUrl,
        path: '',
    };
    const path = [
        summaryInfo.baseUrl,
        ...summaryInfo.folders,
        summaryInfo.sourceFileName.toLowerCase(),
        summaryInfo.category.toLowerCase(),
        summaryInfo.mdFileName.toLowerCase(),
    ];
    summaryInfo.path = path.filter(x => x !== '').join('/');
    return summaryInfo;
};
