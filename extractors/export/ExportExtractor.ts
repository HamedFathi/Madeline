import { SourceFile } from 'ts-morph';
import { SourceFileExtractor } from '../source-file/SourceFileExtractor';
import { ExportInfo } from './ExportInfo';

export class ExportExtractor {
    public extract(sourceFile: SourceFile): ExportInfo[] | undefined {
        let result = sourceFile.getExportDeclarations().map(x => {
            return {
                moduleSpecifier: x.getModuleSpecifierValue(),
                namedExports: x.getNamedExports().length === 0 ? undefined : x.getNamedExports().map(y => {
                    return {
                        name: y.getName(),
                        as: y.getSymbol() === undefined ? undefined : y.getSymbolOrThrow().getName()
                    }
                })
            }
        })
        return result.length === 0 ? undefined : result;
    }
}


