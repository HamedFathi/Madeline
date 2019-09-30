import {
    SourceFile,
    SyntaxKind,
    ClassDeclaration,
    FunctionDeclaration,
    EnumDeclaration,
    TypeAliasDeclaration,
    InterfaceDeclaration,
    VariableDeclaration,
} from 'ts-morph';
import { ClassExtractor } from '../class/ClassExtractor';
import { ImportExtractor } from '../import/ImportExtractor';
import { VariableExtractor } from '../variable/VariableExtractor';
import { EnumExtractor } from '../enum/EnumExtractor';
import { FunctionExtractor } from '../function/FunctionExtractor';
import { TypeAliasExtractor } from '../type-alias/TypeAliasExtractor';
import { InterfaceExtractor } from '../interface/InterfaceExtractor';
import { ClassInfo } from '../class/ClassInfo';
import { VariableInfo } from '../variable/VariableInfo';
import { EnumInfo } from '../enum/EnumInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { TypeAliasInfo } from '../type-alias/TypeAliasInfo';
import { InterfaceInfo } from '../interface/InterfaceInfo';

export class ExportedExtractor {
    public extract(
        sourceFile: SourceFile,
    ): (ClassInfo | VariableInfo | EnumInfo | FunctionInfo | TypeAliasInfo | InterfaceInfo)[] | undefined {
        const result: (ClassInfo | VariableInfo | EnumInfo | FunctionInfo | TypeAliasInfo | InterfaceInfo)[] = [];
        const imports = new ImportExtractor().extract(sourceFile);
        const defaultExport = sourceFile.getDefaultExportSymbol();
        const exportedDeclarations = sourceFile.getExportedDeclarations();
        for (const [name, declarations] of exportedDeclarations) {
            declarations.forEach(declaration => {
                switch (declaration.getKind()) {
                    case SyntaxKind.ClassDeclaration:
                        const c = new ClassExtractor().extract(declaration as ClassDeclaration, imports);
                        if (c) result.push(c);
                        break;
                    case SyntaxKind.VariableDeclaration:
                        const v = new VariableExtractor().extract(declaration as VariableDeclaration, imports);
                        if (v) result.push(v);
                        break;
                    case SyntaxKind.EnumDeclaration:
                        const e = new EnumExtractor().extract(declaration as EnumDeclaration);
                        if (e) result.push(e);
                        break;
                    case SyntaxKind.FunctionDeclaration:
                        const f = new FunctionExtractor().extract(declaration as FunctionDeclaration, imports);
                        if (f) result.push(f);
                        break;
                    case SyntaxKind.TypeAliasDeclaration:
                        const t = new TypeAliasExtractor().extract(declaration as TypeAliasDeclaration, imports);
                        if (t) result.push(t);
                        break;
                    case SyntaxKind.InterfaceDeclaration:
                        const i = new InterfaceExtractor().extract(declaration as InterfaceDeclaration, imports);
                        if (i) result.push(i);
                        break;
                }
            });
        }
        return result.length === 0 ? void 0 : result;
    }
}
