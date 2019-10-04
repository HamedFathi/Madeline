import { TypeCategory } from '../../../../extractors/common/TypeCategory';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';

export const typeCategoryFinder = function(
    from: FromTypeInfo,
    source: ExportedSourceFileInfo,
): TypeCategory | undefined {
    if (source.classes) {
        const result = source.classes.filter(
            x => x.directory === from.directory && x.file === from.file && x.name === from.type,
        );
        if (result && result.length > 0) {
            return TypeCategory.Classes;
        }
    }
    /*
    if (source.destructuring) {
        const result = source.destructuring.filter(x => x.directory === from.directory && x.file === from.file);
        console.log("destructuring");
        console.log(result.map(x=>x.id));
        if (result && result.length > 0) {
            return TypeCategory.Destructuring;
        }
    }
    if (source.exportAssignments) {
        const result = source.exportAssignments.filter(x => x.directory === from.directory && x.file === from.file);
        console.log("exportAssignments");
        console.log(result.map(x=>x.id));
        if (result && result.length > 0) {
            return TypeCategory.ExportAssignments;
        }
    }
    */
    if (source.enums) {
        const result = source.enums.filter(
            x => x.directory === from.directory && x.file === from.file && x.name === from.type,
        );
        if (result && result.length > 0) {
            return TypeCategory.Enums;
        }
    }
    if (source.functions) {
        const result = source.functions.filter(
            x => x.directory === from.directory && x.file === from.file && x.name === from.type,
        );
        if (result && result.length > 0) {
            return TypeCategory.Functions;
        }
    }
    if (source.interfaces) {
        const result = source.interfaces.filter(
            x => x.directory === from.directory && x.file === from.file && x.name === from.type,
        );
        if (result && result.length > 0) {
            return TypeCategory.Interfaces;
        }
    }
    if (source.literals) {
        const result = source.literals.filter(
            x => x.directory === from.directory && x.file === from.file && x.name === from.type,
        );
        if (result && result.length > 0) {
            return TypeCategory.Literals;
        }
    }
    if (source.typeAliases) {
        const result = source.typeAliases.filter(
            x => x.directory === from.directory && x.file === from.file && x.name === from.type,
        );
        if (result && result.length > 0) {
            return TypeCategory.TypeAliases;
        }
    }
    if (source.variables) {
        const result = source.variables.filter(
            x => x.directory === from.directory && x.file === from.file && x.name === from.type,
        );
        if (result && result.length > 0) {
            return TypeCategory.Variables;
        }
    }
    return undefined;
};
