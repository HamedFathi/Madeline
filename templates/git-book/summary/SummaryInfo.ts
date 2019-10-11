import { ItemKind } from './ItemKind';
import { ExportAssignmentInfo } from '../../../extractors/export-assignment/ExportAssignmentInfo';
import { EnumInfo } from '../../../extractors/enum/EnumInfo';
import { DestructuringInfo } from '../../../extractors/destructuring/DestructuringInfo';
import { FunctionInfo } from '../../../extractors/function/FunctionInfo';
import { InterfaceInfo } from '../../../extractors/interface/InterfaceInfo';
import { LiteralInfo } from '../../../extractors/literal/LiteralInfo';
import { TypeAliasInfo } from '../../../extractors/type-alias/TypeAliasInfo';
import { VariableInfo } from '../../../extractors/variable/VariableInfo';
import { SourceFileClassInfo } from '../../../extractors/source-file/SourceFileClassInfo';

export interface SummaryInfo {
    id: string | undefined;
    level: number;
    title: string;
    baseUrl: string;
    url: string;
    extension?: string;
    parent: string | undefined;
    scope: string;
    itemKind: ItemKind;
    children?: SummaryInfo[] | undefined;
    markdownText?: string;
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
