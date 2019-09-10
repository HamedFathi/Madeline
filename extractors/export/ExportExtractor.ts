import { SourceFile } from 'ts-morph';
import { ExportInfo } from './ExportInfo';

export class ExportExtractor {
    public extract(sourceFile: SourceFile): ExportInfo[] | undefined {
        const result = sourceFile.getExportDeclarations().map(x => {
            return {
                text: x.getText(),
                moduleSpecifier: x.getModuleSpecifierValue(),
                namedExports:
                    x.getNamedExports().length === 0
                        ? undefined
                        : x.getNamedExports().map(y => {
                            return {
                                name: y.getName(),
                                alias: y.getSymbol() === undefined ? undefined : y.getSymbolOrThrow().getName(),
                            };
                        }),
            };
        });
        return result.length === 0 ? undefined : result;
    }
}
