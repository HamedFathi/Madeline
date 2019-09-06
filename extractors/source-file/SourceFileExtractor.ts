import {
    SourceFile,
    SyntaxKind,
    EnumDeclaration,
    FunctionDeclaration,
    TypeAliasDeclaration,
    InterfaceDeclaration,
    ClassDeclaration,
    ScriptTarget,
    Project,
    VariableStatement,
    ExpressionStatement,
} from 'ts-morph';
import { EnumInfo } from '../enum/EnumInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { InterfaceInfo } from '../interface/InterfaceInfo';
import { TypeAliasInfo } from '../type-alias/TypeAliasInfo';
import { CoverageExtractorOption } from '../doc-coverage/CoverageExtractorOption';
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
import * as fs from 'fs';
import { VariableExtractor } from '../variable/VariableExtractor';
import { VariableInfo } from '../variable/VariableInfo';
import { ExportAssignmentExtractor } from '../export-assignment/ExportAssignmentExtractor';
import { ExpressionExtractor } from '../expression/ExpressionExtractor';
import { ExpressionInfo } from '../expression/ExpressionInfo';
import { SetAccessorExtractor } from '../set-accessor/SetAccessorExtractor';
import { ExportExtractor } from '../export/ExportExtractor';

export class SourceFileExtractor {
    public extractFromTextFile(sourceFile: string, option?: CoverageExtractorOption): SourceFileInfo | undefined {
        const sourceText = fs.readFileSync(sourceFile, 'utf8');
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5,
            },
        });
        const source = project.createSourceFile('source.ts', sourceText);
        return this.extract(source, option);
    }

    public extractFromText(sourceText: string, option?: CoverageExtractorOption): SourceFileInfo | undefined {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5,
            },
        });
        const source = project.createSourceFile('source.ts', sourceText);
        return this.extract(source, option);
    }

    public extract(sourceFile: SourceFile, option?: CoverageExtractorOption): SourceFileInfo | undefined {
        const imports = new ImportExtractor().extract(sourceFile);
        const exports = new ExportExtractor().extract(sourceFile);
        const exportAssignments = new ExportAssignmentExtractor().extract(sourceFile);
        const coverageDetail = new CoverageExtractor().extract(sourceFile, option);
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
        const variables: VariableInfo[][] = [];
        const expressions: ExpressionInfo[] = [];
        sourceFile.forEachDescendant(node => {
            switch (node.getKind()) {
                case SyntaxKind.EnumDeclaration:
                    enums.push(new EnumExtractor().extract(node as EnumDeclaration));
                    break;
                case SyntaxKind.FunctionDeclaration:
                    functions.push(new FunctionExtractor().extract(node as FunctionDeclaration));
                    break;
                case SyntaxKind.TypeAliasDeclaration:
                    typeAliases.push(new TypeAliasExtractor().extract(node as TypeAliasDeclaration));
                    break;
                case SyntaxKind.InterfaceDeclaration:
                    interfaces.push(new InterfaceExtractor().extract(node as InterfaceDeclaration));
                    break;
                case SyntaxKind.VariableStatement:
                    const isVariableInSourceFile = node.getParentIfKind(SyntaxKind.SourceFile);
                    if (isVariableInSourceFile) {
                        variables.push(new VariableExtractor().extract(node as VariableStatement));
                    }
                    break;
                case SyntaxKind.ExpressionStatement:
                    const isExpressionInSourceFile = node.getParentIfKind(SyntaxKind.SourceFile);
                    if (isExpressionInSourceFile) {
                        expressions.push(new ExpressionExtractor().extract(node as ExpressionStatement));
                    }
                    break;
                case SyntaxKind.ClassDeclaration:
                    const info = new ClassExtractor().extract(node as ClassDeclaration);
                    const constructors = new ConstructorExtractor().extractFromClass(node as ClassDeclaration);
                    const properties = new PropertyExtractor().extractFromClass(node as ClassDeclaration);
                    const methods = new MethodExtractor().extractFromClass(node as ClassDeclaration);
                    const getAccessors = new GetAccessorExtractor().extractFromClass(node as ClassDeclaration);
                    const setAccessors = new SetAccessorExtractor().extractFromClass(node as ClassDeclaration);
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
                    break;
            }
        });
        const result = {
            isDeclarationFile: sourceFile.isDeclarationFile(),
            isFromExternalLibrary: sourceFile.isFromExternalLibrary(),
            isInNodeModules: sourceFile.isInNodeModules(),
            imports: imports === undefined ? undefined : imports,
            coverage: coverage.items === 0 ? undefined : coverage,
            enums: enums.length === 0 ? undefined : enums,
            functions: functions.length === 0 ? undefined : functions,
            typeAliases: typeAliases.length === 0 ? undefined : typeAliases,
            interfaces: interfaces.length === 0 ? undefined : interfaces,
            classes: classes.length === 0 ? undefined : classes,
            variables: variables.length === 0 ? undefined : variables,
            exportAssignments: exportAssignments,
            expressions: expressions.length === 0 ? undefined : expressions,
            exports: exports,
        };
        return result;
    }
}
