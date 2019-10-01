import { SourceFileInfo } from '../../../extractors/source-file/SourceFileInfo';
import { TemplateOptions } from '../../TemplateOptions';
import { ExportAssignmentInfo } from '../../../extractors/export-assignment/ExportAssignmentInfo';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { summaryRouter } from './SummaryRouter';

export class ExportAssignmentSummaryMaker {
    public make(assignments: ExportAssignmentInfo[], baseUrl?: string): SummaryDetailInfo[] {
        const assignmentsInfo: SummaryDetailInfo[] = [];
        for (const a of assignments) {
            const pInfo: PathInfo = {
                path: a.path,
                file: a.file,
                directory: a.directory,
                extension: a.extension,
            };
            const mdFileName = a.id;
            const assignmentSummary = summaryRouter(pInfo, SummaryCategory.ExportAssignments, mdFileName, baseUrl);
            assignmentsInfo.push(assignmentSummary);
        }
        return assignmentsInfo;
    }
}
