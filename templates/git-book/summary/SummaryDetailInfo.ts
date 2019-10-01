import { SummaryCategory } from './SummaryCategory';

export interface SummaryDetailInfo {
    baseUrl: string | undefined;
    folders: string[];
    sourceFileName: string;
    category: SummaryCategory;
    mdFileName: string;
    path: string;
}
