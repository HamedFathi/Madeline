import * as json2md from 'json2md';
import { ClassInfo } from '../../extractors/class/ClassInfo';
// import { ModuleInfo } from '../../extractors/module/ModuleInfo';

export class ClassToMarkdownConverter {
    public convert(classInfo: ClassInfo): string {
        const md = json2md([
            {
                h2: classInfo.name,
            },
        ]);
        return md;
    }
}

// export class ModuleToMarkdown {
//     public convert(modulesInfo: ModuleInfo[]): string {

//         for (let index = modulesInfo.length; index > 0; index--) {
//             const element = modulesInfo[index].;
//         }
//         const md = json2md([
//             {
//                 h2: moduleInfo.name,
//             },
//         ]);
//         return md;
//     }
// }
