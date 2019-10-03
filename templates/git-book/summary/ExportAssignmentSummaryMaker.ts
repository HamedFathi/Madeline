import { ExportAssignmentInfo } from '../../../extractors/export-assignment/ExportAssignmentInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';

export const exportAssignmentSummaryMaker = function make(
    assignments: ExportAssignmentInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: SummaryCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryDetailInfo,
    baseUrl?: string,
): SummaryDetailInfo[] {
    const assignmentsInfo: SummaryDetailInfo[] = [];
    for (const a of assignments) {
        const pInfo: PathInfo = {
            path: a.path,
            file: a.file,
            directory: a.directory,
            extension: a.extension,
        };
        const mdFileName = '_';
        const assignmentSummary = map(a.id, pInfo, SummaryCategory.ExportAssignments, mdFileName, baseUrl);
        assignmentsInfo.push(assignmentSummary);
    }
    return assignmentsInfo;
};
