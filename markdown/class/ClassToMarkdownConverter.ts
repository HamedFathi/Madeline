import * as json2md from 'json2md';
import { ClassInfo } from '../../extractors/class/ClassInfo';
import { CommentInfo } from '../../extractors/comment/CommentInfo';
import { CommentKind } from '../../extractors/comment/CommentKind';
import { StringUtils } from '../../utilities/StringUtils';
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
        const md: string[] = [];

        commentsInfo.forEach(commentInfo => {
            switch (commentInfo.kind) {
                case CommentKind.Html:
                    break;
                case CommentKind.JsSingleLine:
                    if (commentInfo.description) {
                        const info = json2md([
                            {
                                p: !appendDescriptions
                                    ? commentInfo.description
                                    : new StringUtils().joinLines(commentInfo.description, ' '),
                            },
                        ]);
                        md.push(info);
                    }
                    break;
                case CommentKind.JsMultiLine:
                    if (commentInfo.description) {
                        const info = json2md([
                            {
                                p: !appendDescriptions
                                    ? commentInfo.description
                                    : new StringUtils().joinLines(commentInfo.description, ' '),
                            },
                        ]);
                        md.push(info);
                    }
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
