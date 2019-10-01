import { PathInfo } from '../../../utilities/PathInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';

export const summaryRouter = function(
    pathInfo: PathInfo,
    category: SummaryCategory,
    mdFileName: string,
    baseUrl?: string,
): SummaryDetailInfo {
    const folders = pathInfo.directory
        .split('packages')[1]
        .split('/')
        .filter(x => x !== '' && x !== 'src')
        .map(x => x.toLowerCase());

    const summaryInfo: SummaryDetailInfo = {
        category: category,
        folders: folders,
        sourceFileName: pathInfo.file.toLowerCase(),
        mdFileName: mdFileName.toLowerCase(),
        baseUrl: baseUrl,
        path: '',
    };
    const path = [
        summaryInfo.baseUrl,
        ...summaryInfo.folders,
        summaryInfo.sourceFileName,
        summaryInfo.category.toString().toLowerCase(),
        summaryInfo.mdFileName,
    ];
    summaryInfo.path = path.filter(x => x !== '').join('/');
    return summaryInfo;
};
