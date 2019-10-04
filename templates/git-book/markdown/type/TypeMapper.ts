import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from './TypeMapInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { typeCategoryFinder } from './TypeCategoryFinder';
/*
"text": "import(\"D:/@Git/aurelia/packages/__e2e__/node_modules/@aurelia/runtime/node_modules/@aurelia/kernel/dist/di\").IRegistry",
"text": "import(\"D:/@Git/aurelia/packages/__e2e__/node_modules/@aurelia/runtime/dist/binding/expression-parser\").BindingType",

"text": "import(\"D:/@Git/aurelia/packages/i18n/src/utils\").BindingWithBehavior",
"text": "import(\"D:/@Git/aurelia/packages/jit/src/attribute-pattern\").AttributePatternDefinition[]",

"text": "import(\"D:/@Git/aurelia/node_modules/modify-code/index\").ModifyCodeResult",
"text": "import(\"D:/@Git/aurelia/node_modules/@types/webpack/index\").loader.LoaderContext",
*/
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

        if (f.directory.includes('@aurelia') && f.directory.includes('dist')) {
            const dir = f.directory.substr(f.directory.lastIndexOf('@aurelia'));
            const parts = dir
                .split('@aurelia')[1]
                .split('/')
                .filter(x => x !== '' && x !== 'dist');
            parts.forEach(p => {
                pathParts.push(p.toLowerCase());
            });
            pathParts.push(f.file.toLowerCase());
            if (category) {
                pathParts.push(category.toLowerCase());
            }
            pathParts.push(f.type.toLowerCase());
        }
        if (f.directory.includes('packages') && f.directory.includes('src')) {
            const dir = f.directory.substr(f.directory.lastIndexOf('packages'));
            const parts = dir
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
        if (
            f.directory.includes('node_modules') &&
            !f.directory.includes('dist') &&
            !f.directory.includes('src') &&
            !f.directory.includes('@types')
        ) {
            const dir = f.directory.substr(f.directory.lastIndexOf('packages'));
            const parts = dir
                .split('node_modules')[1]
                .split('/')
                .filter(x => x !== '');
            parts.forEach(p => {
                pathParts.push(p.toLowerCase());
            });
            pathParts.push(f.type);
            fromNodeModules = true;
        }
        if (
            f.directory.includes('node_modules') &&
            !f.directory.includes('dist') &&
            !f.directory.includes('src') &&
            f.directory.includes('@types')
        ) {
            const dir = f.directory.substr(f.directory.lastIndexOf('packages'));
            const parts = dir
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
