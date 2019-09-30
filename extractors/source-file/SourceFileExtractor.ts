import {
    SourceFile,
    SyntaxKind,
    EnumDeclaration,
    FunctionDeclaration,
    TypeAliasDeclaration,
    InterfaceDeclaration,
    ClassDeclaration,
    VariableStatement,
    VariableDeclaration,
} from 'ts-morph';
import { EnumInfo } from '../enum/EnumInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { InterfaceInfo } from '../interface/InterfaceInfo';
import { TypeAliasInfo } from '../type-alias/TypeAliasInfo';
import { CoverageExtractorOptions } from '../doc-coverage/CoverageExtractorOptions';
import { ImportExtractor } from '../import/ImportExtractor';
import { EnumExtractor } from '../enum/EnumExtractor';
import { FunctionExtractor } from '../function/FunctionExtractor';
import { TypeAliasExtractor } from '../type-alias/TypeAliasExtractor';
import { InterfaceExtractor } from '../interface/InterfaceExtractor';
import { CoverageExtractor } from '../doc-coverage/CoverageExtractor';
import { CoverageCalculator } from '../doc-coverage/CoverageCalculator';
import { SourceFileInfo } from './SourceFileInfo';
import { SourceFileCoverageInfo } from './SourceFileCoverageInfo';
import { ClassExtractor } from '../class/ClassExtractor';
import { SourceFileClassInfo } from './SourceFileClassInfo';
import { PropertyExtractor } from '../property/PropertyExtractor';
import { MethodExtractor } from '../method/MethodExtractor';
import { GetAccessorExtractor } from '../get-accessor/GetAccessorExtractor';
import { ConstructorExtractor } from '../constructor/ConstructorExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { VariableInfo } from '../variable/VariableInfo';
import { ExportAssignmentExtractor } from '../export-assignment/ExportAssignmentExtractor';
import { SetAccessorExtractor } from '../set-accessor/SetAccessorExtractor';
import { ExportExtractor } from '../export/ExportExtractor';
import { ClassInfo } from '../class/ClassInfo';
import { PropertyInfo } from '../property/PropertyInfo';
import { ConstructorInfo } from '../constructor/ConstructorInfo';
import { MethodInfo } from '../method/MethodInfo';
import { SetAccessorInfo } from '../set-accessor/SetAccessorInfo';
import { GetAccessorInfo } from '../get-accessor/GetAccessorInfo';
import { LiteralInfo } from '../literal/LiteralInfo';
import { DestructuringInfo } from '../destructuring/DestructuringInfo';
import { CommonVariableInfo } from '../variable/CommonVariableInfo';

export class SourceFileExtractor {
    private includeTags(
        node:
            | ClassInfo
            | FunctionInfo
            | PropertyInfo
            | ConstructorInfo
            | MethodInfo
            | SetAccessorInfo
            | GetAccessorInfo
            | LiteralInfo
            | DestructuringInfo
            | CommonVariableInfo
            | TypeAliasInfo
            | EnumInfo
            | InterfaceInfo,
        tags: string[] = ['@internal'],
    ): boolean {
        if (node.leadingComments) {
            const allTags = node.leadingComments.map(x => x.tags);
            for (const all of allTags) {
                if (all) {
                    for (const t of all) {
                        const result = tags.includes(t.tag);
                        if (result) return true;
                    }
                }
            }
        }
        if (node.trailingComments) {
            const allTags = node.trailingComments.map(x => x.tags);
            for (const all of allTags) {
                if (all) {
                    for (const t of all) {
                        const result = tags.includes(t.tag);
                        if (result) return true;
                    }
                }
            }
        }
        return false;
    }

    public extractAll(sourceFiles: SourceFile[], options?: CoverageExtractorOptions): SourceFileInfo[] | undefined {
        const result: SourceFileInfo[] = [];
        sourceFiles.forEach(file => {
            const exported = new SourceFileExtractor().extract(file, options);
            if (exported) {
                result.push(exported);
            }
        });
        return result.length === 0 ? void 0 : result;
    }

    public extractAllExported(
        sourceFiles: SourceFile[],
        options?: CoverageExtractorOptions,
    ): SourceFileInfo[] | undefined {
        const result: SourceFileInfo[] = [];
        sourceFiles.forEach(file => {
            const exported = new SourceFileExtractor().extractExported(file, options);
            if (exported) {
                result.push(exported);
            }
        });
        return result.length === 0 ? void 0 : result;
    }

    // Should filter `@internal` tag by input parameter.
    public extractExported(sourceFile: SourceFile, options?: CoverageExtractorOptions): SourceFileInfo | undefined {
        const path = sourceFile.getFilePath();
        const imports = new ImportExtractor().extract(sourceFile);
        const exports = new ExportExtractor().extract(sourceFile);
        const exportAssignments = new ExportAssignmentExtractor().extract(sourceFile);
        const coverageDetail = new CoverageExtractor().extract(sourceFile, options);
        const coverageInfo = new CoverageCalculator(coverageDetail).calculate();
        const coverage: SourceFileCoverageInfo = {
            details: coverageDetail,
            items: coverageInfo.items,
            documented: coverageInfo.documented,
            undocumented: coverageInfo.undocumented,
        };
        const enums: EnumInfo[] = [];
        const functions: FunctionInfo[] = [];
        const typeAliases: TypeAliasInfo[] = [];
        const interfaces: InterfaceInfo[] = [];
        const classes: SourceFileClassInfo[] = [];
        const variables: VariableInfo[] = [];
        const exportedDeclarations = sourceFile.getExportedDeclarations();
        /* eslint-disable */
        for (const [name, declarations] of exportedDeclarations) {
            /* eslint-disable */
            declarations.forEach(declaration => {
                switch (declaration.getKind()) {
                    case SyntaxKind.ClassDeclaration:
                        const c = new ClassExtractor().extract(declaration as ClassDeclaration, imports);
                        if (c !== void 0) {
                            const constructors = new ConstructorExtractor().extractFromClass(
                                declaration as ClassDeclaration,
                                imports,
                            );
                            const properties = new PropertyExtractor().extractFromClass(
                                declaration as ClassDeclaration,
                                imports,
                            );
                            const methods = new MethodExtractor().extractFromClass(
                                declaration as ClassDeclaration,
                                imports,
                            );
                            const getAccessors = new GetAccessorExtractor().extractFromClass(
                                declaration as ClassDeclaration,
                                imports,
                            );
                            const setAccessors = new SetAccessorExtractor().extractFromClass(
                                declaration as ClassDeclaration,
                                imports,
                            );
                            if (!this.includeTags(c)) {
                                classes.push({
                                    name: c.name,
                                    text: c.text,
                                    modifiers: c.modifiers,
                                    extends: c.extends,
                                    implements: c.implements,
                                    trailingComments: c.trailingComments,
                                    leadingComments: c.leadingComments,
                                    decorators: c.decorators,
                                    modules: c.modules,
                                    constructors: constructors,
                                    properties: properties,
                                    getAccessors: getAccessors,
                                    setAccessors: setAccessors,
                                    methods: methods,
                                });
                            }
                        }
                        break;
                    case SyntaxKind.VariableDeclaration:
                        const extractor = new VariableExtractor();
                        const statement = extractor.getVariableStatementByDeclaration(
                            declaration as VariableDeclaration,
                        );
                        if (statement) {
                            const isVariableInSourceFile = statement.getParentIfKind(SyntaxKind.SourceFile);
                            if (isVariableInSourceFile) {
                                const v = extractor.extract(statement, imports);
                                // TODO: !this.includeTags(v)
                                if (v) variables.push(v);
                            }
                        }
                        break;
                    case SyntaxKind.EnumDeclaration:
                        const e = new EnumExtractor().extract(declaration as EnumDeclaration);
                        if (e && !this.includeTags(e)) enums.push(e);
                        break;
                    case SyntaxKind.FunctionDeclaration:
                        const f = new FunctionExtractor().extract(declaration as FunctionDeclaration, imports);
                        if (f && !this.includeTags(f)) functions.push(f);
                        break;
                    case SyntaxKind.TypeAliasDeclaration:
                        const t = new TypeAliasExtractor().extract(declaration as TypeAliasDeclaration, imports);
                        if (t && !this.includeTags(t)) typeAliases.push(t);
                        break;
                    case SyntaxKind.InterfaceDeclaration:
                        const i = new InterfaceExtractor().extract(declaration as InterfaceDeclaration, imports);
                        if (i && !this.includeTags(i)) interfaces.push(i);
                        break;
                }
            });
        }
        const result = {
            path: path,
            directory: path.substr(0, path.lastIndexOf('/')),
            file: path.substr(path.lastIndexOf('/') + 1),
            isDeclarationFile: sourceFile.isDeclarationFile(),
            isFromExternalLibrary: sourceFile.isFromExternalLibrary(),
            isInNodeModules: sourceFile.isInNodeModules(),
            imports: imports === void 0 ? void 0 : imports,
            coverage: coverage.items === 0 ? void 0 : coverage,
            enums: enums.length === 0 ? void 0 : enums,
            functions: functions.length === 0 ? void 0 : functions,
            typeAliases: typeAliases.length === 0 ? void 0 : typeAliases,
            interfaces: interfaces.length === 0 ? void 0 : interfaces,
            classes: classes.length === 0 ? void 0 : classes,
            variables: variables.length === 0 ? void 0 : variables,
            exportAssignments: exportAssignments,
            exports: exports,
        };
        return result;
    }

    public extract(sourceFile: SourceFile, options?: CoverageExtractorOptions): SourceFileInfo | undefined {
        const path = sourceFile.getFilePath();
        const imports = new ImportExtractor().extract(sourceFile);
        const exports = new ExportExtractor().extract(sourceFile);
        const exportAssignments = new ExportAssignmentExtractor().extract(sourceFile);
        const coverageDetail = new CoverageExtractor().extract(sourceFile, options);
        const coverageInfo = new CoverageCalculator(coverageDetail).calculate();
        const coverage: SourceFileCoverageInfo = {
            details: coverageDetail,
            items: coverageInfo.items,
            documented: coverageInfo.documented,
            undocumented: coverageInfo.undocumented,
        };
        const enums: EnumInfo[] = [];
        const functions: FunctionInfo[] = [];
        const typeAliases: TypeAliasInfo[] = [];
        const interfaces: InterfaceInfo[] = [];
        const classes: SourceFileClassInfo[] = [];
        const variables: VariableInfo[] = [];
        sourceFile.forEachDescendant(node => {
            switch (node.getKind()) {
                case SyntaxKind.EnumDeclaration:
                    enums.push(new EnumExtractor().extract(node as EnumDeclaration));
                    break;
                case SyntaxKind.FunctionDeclaration:
                    functions.push(new FunctionExtractor().extract(node as FunctionDeclaration, imports));
                    break;
                case SyntaxKind.TypeAliasDeclaration:
                    typeAliases.push(new TypeAliasExtractor().extract(node as TypeAliasDeclaration, imports));
                    break;
                case SyntaxKind.InterfaceDeclaration:
                    interfaces.push(new InterfaceExtractor().extract(node as InterfaceDeclaration, imports));
                    break;
                case SyntaxKind.VariableStatement:
                    const isVariableInSourceFile = node.getParentIfKind(SyntaxKind.SourceFile);
                    if (isVariableInSourceFile) {
                        variables.push(new VariableExtractor().extract(node as VariableStatement, imports));
                    }
                    break;
                case SyntaxKind.ClassDeclaration:
                    const info = new ClassExtractor().extract(node as ClassDeclaration, imports);
                    if (info !== void 0) {
                        const constructors = new ConstructorExtractor().extractFromClass(
                            node as ClassDeclaration,
                            imports,
                        );
                        const properties = new PropertyExtractor().extractFromClass(node as ClassDeclaration, imports);
                        const methods = new MethodExtractor().extractFromClass(node as ClassDeclaration, imports);
                        const getAccessors = new GetAccessorExtractor().extractFromClass(
                            node as ClassDeclaration,
                            imports,
                        );
                        const setAccessors = new SetAccessorExtractor().extractFromClass(
                            node as ClassDeclaration,
                            imports,
                        );
                        classes.push({
                            name: info.name,
                            text: info.text,
                            modifiers: info.modifiers,
                            extends: info.extends,
                            implements: info.implements,
                            trailingComments: info.trailingComments,
                            leadingComments: info.leadingComments,
                            decorators: info.decorators,
                            modules: info.modules,
                            constructors: constructors,
                            properties: properties,
                            getAccessors: getAccessors,
                            setAccessors: setAccessors,
                            methods: methods,
                        });
                    }
                    break;
            }
        });
        const result = {
            path: path,
            directory: path.substr(0, path.lastIndexOf('/')),
            file: path.substr(path.lastIndexOf('/') + 1),
            isDeclarationFile: sourceFile.isDeclarationFile(),
            isFromExternalLibrary: sourceFile.isFromExternalLibrary(),
            isInNodeModules: sourceFile.isInNodeModules(),
            imports: imports === void 0 ? void 0 : imports,
            coverage: coverage.items === 0 ? void 0 : coverage,
            enums: enums.length === 0 ? void 0 : enums,
            functions: functions.length === 0 ? void 0 : functions,
            typeAliases: typeAliases.length === 0 ? void 0 : typeAliases,
            interfaces: interfaces.length === 0 ? void 0 : interfaces,
            classes: classes.length === 0 ? void 0 : classes,
            variables: variables.length === 0 ? void 0 : variables,
            exportAssignments: exportAssignments,
            exports: exports,
        };
        return result;
    }
}
