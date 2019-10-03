import * as fse from 'fs-extra';
import { Project } from 'ts-morph';
import { SourceFileExtractor } from '../extractors/source-file/SourceFileExtractor';
import { ExportedSourceFileInfo } from '../extractors/source-file/ExportedSourceFileInfo';
export class AureliaSourceFileUtils {
    public save(tsconfig: string, exported = true): void {
        const project = new Project({
            tsConfigFilePath: tsconfig,
        });
        const sources = project
            .getSourceFiles()
            .filter(x => x.getFilePath().includes('src'))
            .filter(x => !x.getFilePath().includes('__tests__'))
            .filter(x => !x.getFilePath().includes('node_modules'))
            .filter(x => !x.getFilePath().includes('dist'))
            .filter(x => !x.getFilePath().includes('examples'))
            .filter(x => !x.getFilePath().includes('e2e'));
        const extractor = new SourceFileExtractor();
        const src = exported ? extractor.extractAllExported(sources) : extractor.extractAll(sources);
        if (src) {
            fse.removeSync('packages');
            src.forEach(source => {
                const path = ('packages' + (source.path.split('packages')[1] + '.json')).replace('/src', '');
                fse.outputFileSync(path, JSON.stringify(source, null, 2));
            });
        }
    }
    public saveMerged(tsconfig: string): ExportedSourceFileInfo {
        const project = new Project({
            tsConfigFilePath: tsconfig,
        });
        const sources = project
            .getSourceFiles()
            .filter(x => x.getFilePath().includes('src'))
            .filter(x => !x.getFilePath().includes('__tests__'))
            .filter(x => !x.getFilePath().includes('node_modules'))
            .filter(x => !x.getFilePath().includes('dist'))
            .filter(x => !x.getFilePath().includes('examples'))
            .filter(x => !x.getFilePath().includes('e2e'));
        const extractor = new SourceFileExtractor();
        const source = extractor.fetchAllExported(sources);
        fse.removeSync('packages');
        fse.outputFileSync('packages/merged.json', JSON.stringify(source, null, 2));
        return source;
    }
}
