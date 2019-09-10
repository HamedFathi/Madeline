import { NamedExportInfo } from './NamedExportInfo';
export interface ExportInfo {
    moduleSpecifier: string | undefined;
    namedExports: NamedExportInfo[] | undefined;
    text: string;
}
