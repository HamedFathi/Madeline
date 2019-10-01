import { SourceFileClassInfo } from '../../../extractors/source-file/SourceFileClassInfo';
import { PathInfo } from '../../../utilities/PathInfo';
import { summaryRouter } from './SummaryRouter';
import { SummaryCategory } from './SummaryCategory';
export class ClassSummaryMaker {
    public make(classes: SourceFileClassInfo[], baseUrl?: string): string[] {
        const lines: string[] = [];
        // [type, name, path]
        const info: [string, string, string][] = [];
        for (const c of classes) {
            const pInfo: PathInfo = {
                path: c.path,
                file: c.file,
                directory: c.directory,
                extension: c.extension,
            };
            const mdFileName = c.name + '.md';
            const p = summaryRouter(pInfo, SummaryCategory.Classes.toString(), mdFileName, baseUrl);
            const a = 1;
        }
        return [];
    }
}
