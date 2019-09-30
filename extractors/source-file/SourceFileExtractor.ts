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
import { PathUtils } from '../../utilities/PathUtils';
import { HashUtils } from '../../utilities/HashUtils';
import { LiteralExtractor } from '../literal/LiteralExtractor';
import { DestructuringExtractor } from '../destructuring/DestructuringExtractor';
import { ExportAssignmentInfo } from '../export-assignment/ExportAssignmentInfo';
import { MergedSourceFileInfo } from './MergedSourceFileInfo';

export class SourceFileExtractor {
    constructor(private hashUtils: HashUtils = new HashUtils(), private pathUtils: PathUtils = new PathUtils()) {}

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
            | VariableInfo
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

    public fetchAllExported(sourceFiles: SourceFile[]): MergedSourceFileInfo {
        const processed: string[] = [];
        const classes: SourceFileClassInfo[] = [];
        const enums: EnumInfo[] = [];
        const functions: FunctionInfo[] = [];
        const typeAliases: TypeAliasInfo[] = [];
        const interfaces: InterfaceInfo[] = [];
        const exportAssignments: ExportAssignmentInfo[] = [];
        const variables: VariableInfo[] = [];
        const literals: LiteralInfo[] = [];
        const destructuring: DestructuringInfo[] = [];
        const sources = this.extractAllExported(sourceFiles, undefined);
        if (sources) {
            for (const src of sources) {
                if (src.classes) {
                    for (const c of src.classes) {
                        if (!processed.includes(c.id)) {
                            classes.push(c);
                        }
                        processed.push(c.id);
                    }
                }
                if (src.enums) {
                    for (const e of src.enums) {
                        if (!processed.includes(e.id)) {
                            enums.push(e);
                        }
                        processed.push(e.id);
                    }
                }
                if (src.functions) {
                    for (const f of src.functions) {
                        if (!processed.includes(f.id)) {
                            functions.push(f);
                        }
                        processed.push(f.id);
                    }
                }
                if (src.typeAliases) {
                    for (const ta of src.typeAliases) {
                        if (!processed.includes(ta.id)) {
                            typeAliases.push(ta);
                        }
                        processed.push(ta.id);
                    }
                }
                if (src.interfaces) {
                    for (const i of src.interfaces) {
                        if (!processed.includes(i.id)) {
                            interfaces.push(i);
                        }
                        processed.push(i.id);
                    }
                }
                if (src.exportAssignments) {
                    for (const ex of src.exportAssignments) {
                        if (!processed.includes(ex.id)) {
                            exportAssignments.push(ex);
                        }
                        processed.push(ex.id);
                    }
                }
                if (src.variables) {
                    for (const v of src.variables) {
                        if (!processed.includes(v.id)) {
                            variables.push(v);
                        }
                        processed.push(v.id);
                    }
                }
                if (src.literals) {
                    for (const l of src.literals) {
                        if (!processed.includes(l.id)) {
                            literals.push(l);
                        }
                        processed.push(l.id);
                    }
                }
                if (src.destructuring) {
                    for (const d of src.destructuring) {
                        if (!processed.includes(d.id)) {
                            destructuring.push(d);
                        }
                        processed.push(d.id);
                    }
                }
            }
        }
        return {
            enums: enums.length === 0 ? void 0 : enums,
            functions: functions.length === 0 ? void 0 : functions,
            typeAliases: typeAliases.length === 0 ? void 0 : typeAliases,
            interfaces: interfaces.length === 0 ? void 0 : interfaces,
            classes: classes.length === 0 ? void 0 : classes,
            variables: variables.length === 0 ? void 0 : variables,
            literals: literals.length === 0 ? void 0 : literals,
            destructuring: destructuring.length === 0 ? void 0 : destructuring,
            exportAssignments: exportAssignments,
        };
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
        const literals: LiteralInfo[] = [];
        const destructuring: DestructuringInfo[] = [];
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
                                    path: c.path,
                                    directory: c.directory,
                                    file: c.file,
                                    id: this.hashUtils.getSha256(c.text)
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
                                let v = new VariableExtractor().extract(statement as VariableStatement, imports);
                                let l = new LiteralExtractor().extract(statement as VariableStatement, imports);
                                let d = new DestructuringExtractor().extract(statement as VariableStatement);
                                if (v) {
                                    v.forEach(element => {
                                        if (element && !this.includeTags(element)) variables.push(element);
                                    });
                                }
                                if (l) {
                                    l.forEach(element => {
                                        if (element && !this.includeTags(element)) literals.push(element);
                                    });
                                }
                                if (d) {
                                    d.forEach(element => {
                                        if (element && !this.includeTags(element)) destructuring.push(element);
                                    });
                                }
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
        let pathInfo = this.pathUtils.getPathInfo(sourceFile.getFilePath());
        const result = {
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
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
            literals: literals.length === 0 ? void 0 : literals,
            destructuring: destructuring.length === 0 ? void 0 : destructuring,
            exportAssignments: exportAssignments,
            exports: exports,
            id: this.hashUtils.getSha256(sourceFile.getFullText()),
        };
        return result;
    }

    public extract(sourceFile: SourceFile, options?: CoverageExtractorOptions): SourceFileInfo | undefined {
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
        const literals: LiteralInfo[] = [];
        const destructuring: DestructuringInfo[] = [];
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
                        let v = new VariableExtractor().extract(node as VariableStatement, imports);
                        let l = new LiteralExtractor().extract(node as VariableStatement, imports);
                        let d = new DestructuringExtractor().extract(node as VariableStatement);
                        if (v) {
                            v.forEach(element => {
                                variables.push(element);
                            });
                        }
                        if (l) {
                            l.forEach(element => {
                                literals.push(element);
                            });
                        }
                        if (d) {
                            d.forEach(element => {
                                destructuring.push(element);
                            });
                        }
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
                            path: info.path,
                            directory: info.directory,
                            file: info.file,
                            id: this.hashUtils.getSha256(info.text)
                        });
                    }
                    break;
            }
        });
        let pathInfo = this.pathUtils.getPathInfo(sourceFile.getFilePath());
        const result = {
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
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
            literals: literals.length === 0 ? void 0 : literals,
            destructuring: destructuring.length === 0 ? void 0 : destructuring,
            exportAssignments: exportAssignments,
            exports: exports,
            id: this.hashUtils.getSha256(sourceFile.getFullText()),
        };
        return result;
    }
}
