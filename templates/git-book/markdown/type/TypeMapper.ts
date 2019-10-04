import { TypeCategory } from '../../../../extractors/common/TypeCategory';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from './TypeMapInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { typeCategoryFinder } from './typeCategoryFinder';

export const typeMapper = function(
    id: string,
    from: FromTypeInfo[],
    source: ExportedSourceFileInfo,
    baseUrl?: string,
): TypeMapInfo[] {
    const result: TypeMapInfo[] = [];
    for (const f of from) {
        const category = typeCategoryFinder(f, source);
        const pathParts: string[] = [];
        let fromNodeModules = false;
        if (baseUrl) {
            pathParts.push(baseUrl);
        }
        if (f.path.includes('packages')) {
            const parts = f.directory
                .split('packages')[1]
                .split('/')
                .filter(x => x !== '' && x !== 'src');
            parts.forEach(p => {
                pathParts.push(p.toLowerCase());
            });
            pathParts.push(f.file.toLowerCase());
            if (category) {
                pathParts.push(category.toLowerCase());
            }
            pathParts.push(f.type.toLowerCase());
        }
        if (f.directory.includes('node_modules')) {
            const parts = f.directory
                .split('node_modules')[1]
                .split('/')
                .filter(x => x !== '');
            parts.forEach(p => {
                pathParts.push(p.toLowerCase());
            });
            pathParts.push(f.type);
            fromNodeModules = true;
        }
        const typeMap: TypeMapInfo = {
            id: id,
            type: f.type,
            baseUrl: baseUrl,
            fromNodeModules: fromNodeModules,
            path: pathParts.join('/'),
        };
        result.push(typeMap);
    }
    return result;
};
