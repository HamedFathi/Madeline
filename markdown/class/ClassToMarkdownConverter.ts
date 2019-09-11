import * as json2md from 'json2md';
import { ClassInfo } from '../../extractors/class/ClassInfo';
import { CommentInfo } from '../../extractors/comment/CommentInfo';
import { CommentKind } from '../../extractors/comment/CommentKind';
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

export class CommentToMarkdownConverter {
    public convert(commentsInfo: CommentInfo[], appendDescriptions = false): string[] {
        let md :string[]= [];

        commentsInfo.forEach(commentInfo => {
            switch (commentInfo.kind) {
                case CommentKind.Html:
                    break;
                case CommentKind.JsSingleLine:
                    if (commentInfo.description) {
                        let info = json2md([
                            {
                                p: !appendDescriptions ? commentInfo.description : commentInfo.description.join(' '),
                            },
                        ]);
                        md.push(info);
                    }
                    break;
                case CommentKind.JsMultiLine:
                    break;
            }
        });
        
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
