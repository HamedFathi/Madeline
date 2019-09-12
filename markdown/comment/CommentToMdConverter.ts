import { CommentInfo } from '../../extractors/comment/CommentInfo';
import { CommentKind } from '../../extractors/comment/CommentKind';
import { StringUtils } from '../../utilities/StringUtils';
import * as json2md from 'json2md';
import * as _ from 'lodash';

export class CommentToMdConverter {
    public convert(commentsInfo: CommentInfo[], appendDescriptions = false, isMergeable = true): string | string[] {

        commentsInfo.forEach(element => {
            this.groupByTags(element);
        });


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

    private groupByTags(commentsInfo: CommentInfo) {
        if (commentsInfo.tags) {
            let tagsGroup = _(commentsInfo.tags).groupBy(x => x.tag).values().value();
            tagsGroup.forEach(tagGroup => {
                let tags = tagGroup.map(u => u);
                tags.forEach(tag => {

                });

            });
            const yy = 1;
        }
    }
}


