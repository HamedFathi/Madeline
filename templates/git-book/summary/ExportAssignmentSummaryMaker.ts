import { ExportAssignmentInfo } from '../../../extractors/export-assignment/ExportAssignmentInfo';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { PathInfo } from '../../../utilities/PathInfo';

export const exportAssignmentSummaryMaker = function make(
    assignments: ExportAssignmentInfo[],
    map: (
        id: string,
        pathInfo: PathInfo,
        category: TypeCategory,
        mdFileName: string,
        baseUrl?: string,
    ) => SummaryMapInfo,
    baseUrl?: string,
): SummaryMapInfo[] {
    const assignmentsInfo: SummaryMapInfo[] = [];
    for (const a of assignments) {
        const pInfo: PathInfo = {
            path: a.path,
            file: a.file,
            directory: a.directory,
            extension: a.extension,
        };
        const mdFileName = '_';
        const assignmentSummary = map(a.id, pInfo, TypeCategory.ExportAssignments, mdFileName, baseUrl);
        assignmentsInfo.push(assignmentSummary);
    }
    return assignmentsInfo;
};
