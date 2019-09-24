import { EnumInfo } from '../enum/EnumInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { InterfaceInfo } from '../interface/InterfaceInfo';
import { TypeAliasInfo } from '../type-alias/TypeAliasInfo';
import { SourceFileCoverageInfo } from './SourceFileCoverageInfo';
import { SourceFileClassInfo } from './SourceFileClassInfo';
import { VariableInfo } from '../variable/VariableInfo';
import { ExportAssignmentInfo } from '../export-assignment/ExportAssignmentInfo';
import { ExportInfo } from '../export/ExportInfo';
import { ImportInfo } from '../import/ImportInfo';
export interface SourceFileInfo {
    isDeclarationFile: boolean;
    isFromExternalLibrary: boolean;
    isInNodeModules: boolean;
    imports: ImportInfo[] | undefined;
    exports: ExportInfo[] | undefined;
    classes: SourceFileClassInfo[] | undefined;
    enums: EnumInfo[] | undefined;
    functions: FunctionInfo[] | undefined;
    interfaces: InterfaceInfo[] | undefined;
    typeAliases: TypeAliasInfo[] | undefined;
    coverage: SourceFileCoverageInfo | undefined;
    variables: VariableInfo[] | undefined;
    exportAssignments: ExportAssignmentInfo[] | undefined;
}
