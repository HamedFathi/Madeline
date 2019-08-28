import { SourceFile, SyntaxKind, EnumDeclaration, FunctionDeclaration, TypeAliasDeclaration, InterfaceDeclaration, ClassDeclaration, ScriptTarget, Project, VariableStatement } from 'ts-morph';
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

export class SourceFileExtractor {

    public extractFromFile(sourceFile: string, option?: CoverageExtractorOption): SourceFileInfo | undefined {
        let sourceText = fs.readFileSync(sourceFile, 'utf8');
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const source = project.createSourceFile("source.ts", sourceText);
        return this.extract(source, option);
    }

    public extractFromText(sourceText: string, option?: CoverageExtractorOption): SourceFileInfo | undefined {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const source = project.createSourceFile("source.ts", sourceText);
        return this.extract(source, option);
    }

    public extract(sourceFile: SourceFile, option?: CoverageExtractorOption): SourceFileInfo | undefined {

        let imports = new ImportExtractor().extract(sourceFile);
        let coverageDetail = new CoverageExtractor().extract(sourceFile, option);
        let coverageInfo = new CoverageCalculator(coverageDetail).calculate();
        let coverage: SourceFileCoverageInfo = {
            detail: coverageDetail,
            items: coverageInfo.items,
            documented: coverageInfo.documented,
            undocumented: coverageInfo.undocumented
        }
        let enums: EnumInfo[] = [];
        let functions: FunctionInfo[] = [];
        let typeAliases: TypeAliasInfo[] = [];
        let interfaces: InterfaceInfo[] = [];
        let classes: SourceFileClassInfo[] = [];
        let variables: VariableInfo[][] = [];
        sourceFile.forEachDescendant(node => {
            switch (node.getKind()) {
                case SyntaxKind.EnumDeclaration:
                    enums.push(new EnumExtractor().extract(<EnumDeclaration>node));
                    break;
                case SyntaxKind.FunctionDeclaration:
                    functions.push(new FunctionExtractor().extract(<FunctionDeclaration>node));
                    break;
                case SyntaxKind.TypeAliasDeclaration:
                    typeAliases.push(new TypeAliasExtractor().extract(<TypeAliasDeclaration>node));
                    break;
                case SyntaxKind.InterfaceDeclaration:
                    interfaces.push(new InterfaceExtractor().extract(<InterfaceDeclaration>node));
                    break;
                    case SyntaxKind.VariableStatement:
                    variables.push(new VariableExtractor().extract(<VariableStatement>node));
                    break;
                case SyntaxKind.ClassDeclaration:
                    let info = new ClassExtractor().extract(<ClassDeclaration>node);
                    let constructors = new ConstructorExtractor().extract(<ClassDeclaration>node);
                    let properties = new PropertyExtractor().extract(<ClassDeclaration>node);
                    let methods = new MethodExtractor().extract(<ClassDeclaration>node);
                    let getAccessors = new GetAccessorExtractor().extract(<ClassDeclaration>node);
                    classes.push({
                        name: info.name,
                        text: info.text,
                        modifiers: info.modifiers,
                        extends: info.extends,
                        implements: info.implements,
                        trailingComments: info.trailingComments,
                        leadingComments: info.leadingComments,
                        decorators: info.decorators,
                        namespaces: info.namespaces,
                        constructors: constructors,
                        properties: properties,
                        getAccessors: getAccessors,
                        methods: methods
                    });
                    break;
            }
        });
        let result = {
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
            variables: variables.length === 0 ? undefined : variables
        };
        return result;
    }
}

