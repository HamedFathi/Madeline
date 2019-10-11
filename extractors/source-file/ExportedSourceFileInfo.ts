import { EnumInfo } from '../enum/EnumInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { InterfaceInfo } from '../interface/InterfaceInfo';
import { TypeAliasInfo } from '../type-alias/TypeAliasInfo';
import { SourceFileClassInfo } from './SourceFileClassInfo';
import { VariableInfo } from '../variable/VariableInfo';
import { ExportAssignmentInfo } from '../export-assignment/ExportAssignmentInfo';
import { LiteralInfo } from '../literal/LiteralInfo';
import { DestructuringInfo } from '../destructuring/DestructuringInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
export interface ExportedSourceFileInfo {
    classes: SourceFileClassInfo[] | undefined;
    enums: EnumInfo[] | undefined;
    functions: FunctionInfo[] | undefined;
    interfaces: InterfaceInfo[] | undefined;
    typeAliases: TypeAliasInfo[] | undefined;
    variables: VariableInfo[] | undefined;
    literals: LiteralInfo[] | undefined;
    destructuring: DestructuringInfo[] | undefined;
    exportAssignments: ExportAssignmentInfo[] | undefined;
}
