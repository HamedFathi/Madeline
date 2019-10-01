import { SourceFileInfo } from '../../../extractors/source-file/SourceFileInfo';
import { TemplateOptions } from '../../TemplateOptions';
import { EnumMember } from 'ts-morph';

export class EnumSummaryMaker {
    public make(enums: EnumMember[], options: TemplateOptions): string {
        const lines: string[] = [];
        enums.forEach(e => {});
        return '';
    }
}
