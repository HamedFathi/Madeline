import { FromTypeInfo } from '../extractors/common/FromTypeInfo';

export interface TemplateOptions {
    append: boolean;
    removeAtSignTag: boolean;
    route: (from: FromTypeInfo) => string | undefined;
    url: string;
}
