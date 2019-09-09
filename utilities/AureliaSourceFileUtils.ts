import * as path from "path";
import * as fs from "fs";
import { Project, ScriptTarget } from 'ts-morph';
import { AureliaSourceFile } from './AureliaSourceFile';
export class AureliaSourceFileUtils {
    private readonly PACKAGES = 'packages';
    private readonly SOURCE = 'src';
    private readonly EXCLUDES = ['__tests__', 'examples'];
    public getSourceFiles(dirPath: string): AureliaSourceFile[] | undefined {
        const sources: AureliaSourceFile[] = [];
        const packageDir = path.join(dirPath, this.PACKAGES);
        if (!this.isDirectoryExists(packageDir))
            return undefined;
        let packagesList = this.getDirectoriesList(packageDir, x => !this.EXCLUDES.includes(x));
        let project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        packagesList.forEach(pkg => {
            const srcDir = path.join(packageDir, pkg, this.SOURCE);
            if (this.isDirectoryExists(srcDir)) {
                let glob = path.join(srcDir, '**', '*.ts');
                project.addExistingSourceFiles(glob);
                let sourceFiles = project.getSourceFiles();
                sources.push({
                    name: pkg,
                    directory: srcDir,
                    sourceFiles: sourceFiles
                });
            }
        });
        return sources.length === 0 ? undefined : sources;
    }
    private isDirectoryExists(dirPath: string): boolean {
        return fs.existsSync(dirPath);
    }

    private getDirectoriesList(dirPath: string, filter?: (x: string) => boolean): string[] {
        let list = fs.readdirSync(dirPath)
            .filter(f => fs.statSync(path.join(dirPath, f)).isDirectory());
        if (filter) {
            list = list.filter(x => filter(x));
        }
        return list;
    }
}

