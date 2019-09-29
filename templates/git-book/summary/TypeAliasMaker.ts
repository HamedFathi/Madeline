import { SourceFileInfo } from '../../../extractors/source-file/SourceFileInfo';
import { TemplateOptions } from '../../TemplateOptions';
import { TypeAliasTemplateInfo } from '../../api/type-alias/TypeAliasTemplateInfo';

export class TypeAliasMaker {
    public make(typeAliases: TypeAliasTemplateInfo[], options: TemplateOptions): string {
        const lines: string[] = [];
        typeAliases.forEach(ta => {});
        return '';
    }
}
