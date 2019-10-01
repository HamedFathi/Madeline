import { TemplateOptions } from '../../TemplateOptions';
import { SourceFileClassInfo } from '../../../extractors/source-file/SourceFileClassInfo';
import { PathInfo } from '../../../utilities/PathInfo';
export class ClassSummaryMaker {
    public make(classes: SourceFileClassInfo[], route: (path: PathInfo) => string): string[] {
        const lines: string[] = [];
        for (const c of classes) {
            const pInfo: PathInfo = {
                path: c.path,
                file: c.file,
                directory: c.directory,
                extension: c.extension,
            };
            const a = 1;
        }
        return [];
    }
}
