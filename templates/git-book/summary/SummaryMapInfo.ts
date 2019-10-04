import { TypeCategory } from '../../../extractors/common/TypeCategory';

export interface SummaryMapInfo {
    id: string;
    baseUrl: string | undefined;
    folders: string[];
    sourceFileName: string;
    category: TypeCategory;
    mdFileName: string;
    path: string;
}
