import { VariableInfo } from '../../../extractors/variable/VariableInfo';
import { TypeAliasInfo } from '../../../extractors/type-alias/TypeAliasInfo';
import { LiteralInfo } from '../../../extractors/literal/LiteralInfo';
import { ExportAssignmentInfo } from '../../../extractors/export-assignment/ExportAssignmentInfo';
import { DestructuringInfo } from '../../../extractors/destructuring/DestructuringInfo';
import { SourceFileClassInfo } from '../../../extractors/source-file/SourceFileClassInfo';
import { EnumInfo } from '../../../extractors/enum/EnumInfo';
import { InterfaceInfo } from '../../../extractors/interface/InterfaceInfo';
import { FunctionInfo } from '../../../extractors/function/FunctionInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { ClassToMdConverter } from '../markdown/class/ClassToMdConverter';
import { ExportedSourceFileInfo } from '../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../extractors/common/FromTypeInfo';
import { CommentToMdOption } from '../markdown/comment/CommentToMdOption';
import { TypeMapInfo } from '../markdown/type/TypeMapInfo';
import { DecoratorToMdConverter } from '../markdown/decorator/DecoratorToMdConverter';
import { DestructuringToMdConverter } from '../markdown/destructuring/DestructuringToMdConverter';
import { EnumToMdConverter } from '../markdown/enum/EnumToMdConverter';
import { ExportAssignmentToMdConverter } from '../markdown/export-assignment/ExportAssignmentToMdConverter';
import { FunctionToMdConverter } from '../markdown/function/FunctionToMdConverter';
import { InterfaceToMdConverter } from '../markdown/interface/InterfaceToMdConverter';
import { LiteralToMdConverter } from '../markdown/literal/LiteralToMdConverter';
import { TypeAliasToMdConverter } from '../markdown/type-alias/TypeAliasToMdConverter';
import { VariableToMdConverter } from '../markdown/variable/VariableToMdConverter';

export function NodeToMdConverter(
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
        | undefined,
    source: ExportedSourceFileInfo,
    map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
    baseUrl?: string,
    commentOptions?: CommentToMdOption,
): string {
    let text = '';

    try {
        
        if (node) {
            switch (node.typeCategory) {
                case TypeCategory.Classes:
                    text = new ClassToMdConverter().convertSourceFileClassInfo(
                        node as SourceFileClassInfo,
                        source,
                        map,
                        baseUrl,
                        commentOptions,
                    );
                    break;
                case TypeCategory.Destructuring:
                    text = new DestructuringToMdConverter().convert(node as DestructuringInfo, commentOptions);
                    break;
                case TypeCategory.Enums:
                    text = new EnumToMdConverter().convert(node as EnumInfo, commentOptions);
                    break;
                case TypeCategory.ExportAssignments:
                    text = new ExportAssignmentToMdConverter().convert(node as ExportAssignmentInfo, commentOptions);
                    break;
                case TypeCategory.Functions:
                    text = new FunctionToMdConverter().convert(node as FunctionInfo, source, map, baseUrl, commentOptions);
                    break;
                case TypeCategory.Interfaces:
                    text = new InterfaceToMdConverter().convert(
                        node as InterfaceInfo,
                        source,
                        map,
                        baseUrl,
                        commentOptions,
                    );
                    break;
                case TypeCategory.Literals:
                    text = new LiteralToMdConverter().convert(node as LiteralInfo, source, map, baseUrl, commentOptions);
                    break;
                case TypeCategory.TypeAliases:
                    text = new TypeAliasToMdConverter().convert(
                        node as TypeAliasInfo,
                        source,
                        map,
                        baseUrl,
                        commentOptions,
                    );
                    break;
                case TypeCategory.Variables:
                    text = new VariableToMdConverter().convert(node as VariableInfo, source, map, baseUrl, commentOptions);
                    break;
            }
        }
    } catch (error) {
        const a = 1;
    }

    return text;
}
