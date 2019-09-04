import { SourceFile } from 'ts-morph';
import { SourceFileExtractor } from '../source-file/SourceFileExtractor';

export class ExportExtractor {
    public extract(sourceFile: SourceFile): any {
        let info = sourceFile.getExportDeclarations().map(x => {
            return {
                f: x.getModuleSpecifier(),
                v: x.getNamedExports()   
                g:             
            }
        })
        return undefined;
    }
}


