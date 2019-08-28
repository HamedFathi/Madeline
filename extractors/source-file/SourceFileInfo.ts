import { ImportInfo } from '../import/ImportInfo';
import { EnumInfo } from '../enum/EnumInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { InterfaceInfo } from '../interface/InterfaceInfo';
import { TypeAliasInfo } from '../type-alias/TypeAliasInfo';
import { SourceFileCoverageInfo } from "./SourceFileCoverageInfo";
import { SourceFileClassInfo } from "./SourceFileClassInfo";
import { VariableInfo } from '../variable/VariableInfo';
export interface SourceFileInfo {
    isDeclarationFile: boolean,
    isFromExternalLibrary: boolean,
    isInNodeModules: boolean,
    imports: ImportInfo[] | undefined;
    classes: SourceFileClassInfo[] | undefined;
    enums: EnumInfo[] | undefined;
    functions: FunctionInfo[] | undefined;
    interfaces: InterfaceInfo[] | undefined;
    typeAliases: TypeAliasInfo[] | undefined;
    coverage: SourceFileCoverageInfo | undefined;
    variables: VariableInfo[][] | undefined;
}
