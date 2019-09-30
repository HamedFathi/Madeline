import { SourceFileInfo } from '../../../extractors/source-file/SourceFileInfo';
import { TemplateOptions } from '../../TemplateOptions';
import { FunctionInfo } from '../../../extractors/function/FunctionInfo';

export class FunctionMaker {
    public make(functions: FunctionInfo[], options: TemplateOptions): string {
        const lines: string[] = [];
        functions.forEach(func => {});
        return '';
    }
}
