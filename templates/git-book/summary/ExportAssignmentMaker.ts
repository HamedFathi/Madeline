import { SourceFileInfo } from '../../../extractors/source-file/SourceFileInfo';
import { TemplateOptions } from '../../TemplateOptions';
import { ExportAssignmentInfo } from '../../../extractors/export-assignment/ExportAssignmentInfo';

export class ExportAssignmentMaker {
    public make(assignments: ExportAssignmentInfo[], options: TemplateOptions): string {
        const lines: string[] = [];
        assignments.forEach(assignment => {});
        return '';
    }
}
