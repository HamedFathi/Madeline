import { TypeScope } from '../../../extractors/common/TypeScope';

export interface SummaryMapInfo {
    id: string;
    baseUrl: string | undefined;
    folders: string[];
    sourceFileName: string;
    category: TypeScope;
    mdFileName: string;
    path: string;
}
