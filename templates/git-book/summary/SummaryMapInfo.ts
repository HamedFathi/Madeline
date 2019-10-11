import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { VariableInfo } from '../../../extractors/variable/VariableInfo';
import { LiteralInfo } from '../../../extractors/literal/LiteralInfo';
import { InterfaceInfo } from '../../../extractors/interface/InterfaceInfo';
import { FunctionInfo } from '../../../extractors/function/FunctionInfo';
import { DestructuringInfo } from '../../../extractors/destructuring/DestructuringInfo';
import { ClassInfo } from '../../../extractors/class/ClassInfo';
import { EnumInfo } from '../../../extractors/enum/EnumInfo';
import { ExportAssignmentInfo } from '../../../extractors/export-assignment/ExportAssignmentInfo';
import { TypeAliasInfo } from '../../../extractors/type-alias/TypeAliasInfo';
import { SourceFileClassInfo } from '../../../extractors/source-file/SourceFileClassInfo';

export interface SummaryMapInfo {
    id: string;
    baseUrl: string | undefined;
    folders: string[];
    sourceFileName: string;
    category: TypeCategory;
    mdFileName: string;
    path: string;
    node:
        | SourceFileClassInfo
        | DestructuringInfo
        | EnumInfo
        | ExportAssignmentInfo
        | FunctionInfo
        | InterfaceInfo
        | LiteralInfo
        | TypeAliasInfo
        | VariableInfo
        | undefined;
}
