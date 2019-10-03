import { SummaryCategory } from './SummaryCategory';

export interface SummaryDetailInfo {
    id: string;
    baseUrl: string | undefined;
    folders: string[];
    sourceFileName: string;
    category: SummaryCategory;
    mdFileName: string;
    path: string;
}
