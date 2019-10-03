import { ExportAssignmentInfo } from '../../../extractors/export-assignment/ExportAssignmentInfo';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeScope } from '../../../extractors/common/TypeScope';
import { PathInfo } from '../../../utilities/PathInfo';

export const exportAssignmentSummaryMaker = function make(
    assignments: ExportAssignmentInfo[],
    map: (id: string, pathInfo: PathInfo, category: TypeScope, mdFileName: string, baseUrl?: string) => SummaryMapInfo,
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
        const assignmentSummary = map(a.id, pInfo, TypeScope.ExportAssignments, mdFileName, baseUrl);
        assignmentsInfo.push(assignmentSummary);
    }
    return assignmentsInfo;
};
