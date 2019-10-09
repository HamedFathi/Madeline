import { ExportAssignmentTemplateInfo } from './ExportAssignmentTemplateInfo';
import { ExportAssignmentInfo } from '../../../../extractors/export-assignment/ExportAssignmentInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { EXPORT_ASSIGNMENT_TEMPLATE } from './ExportAssignmentTemplate';

export class ExportAssignmentToMdConverter {
    constructor(
        private markdownUtils = new MarkdownUtils(),
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
    ) {}
    public convert(exportAssignmentInfo: ExportAssignmentInfo, commentOptions?: CommentToMdOption): string {
        const description: string[] = [];
        if (exportAssignmentInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(exportAssignmentInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (exportAssignmentInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(
                exportAssignmentInfo.trailingComments,
                commentOptions,
            );
            description.concat(trailing);
        }
        const modules = exportAssignmentInfo.modules
            ? this.moduleToMdConverter.convert(exportAssignmentInfo.modules, commentOptions)
            : undefined;
        const obj: ExportAssignmentTemplateInfo = {
            text: exportAssignmentInfo.text,
            description: description.length === 0 ? void 0 : description,
            modules: modules,
            hasComment: exportAssignmentInfo.hasComment,
            isExportDefault: exportAssignmentInfo.isExportDefault,
        };
        const text = Nunjucks.renderString(EXPORT_ASSIGNMENT_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
