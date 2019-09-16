import { TagInfo } from '../../extractors/comment/TagInfo';
import { CommentToMdOption } from './CommentToMdOption';
import * as _ from 'lodash';
import { TagInfoHeader } from './TagInfoHeader';
import { CommentGroupInfo } from './CommentGroupInfo';

export class CommentGroup {
    public groupByTagName(tagsInfo: TagInfo[], option?: CommentToMdOption): CommentGroupInfo[] {
        const result: CommentGroupInfo[] = [];
        const tagsGroup = _(tagsInfo)
            .groupBy(x => x.tag)
            .values()
            .value();

        tagsGroup.forEach(tagsInfo => {
            const item: CommentGroupInfo = {
                headers: undefined,
                tags: [],
                title: '',
            };
            const info = this.getTagsInfoHeader(tagsInfo);
            if (info) {
                item.headers = info.headers;
            }
            if (tagsInfo.length > 0) {
                item.title = this.getAlternativeTagName(tagsInfo[0], option);
            }
            tagsInfo.forEach(tagInfo => {
                item.tags.push({
                    name: tagInfo.name,
                    defaultValue: tagInfo.defaultValue,
                    description: tagInfo.description,
                    type: tagInfo.type,
                    tag: tagInfo.tag,
                });
            });
        });
        return result;
    }

    private getAlternativeTagName(tagInfo: TagInfo, option?: CommentToMdOption): string {
        let alternativeName = tagInfo.tag;
        if (option) {
            if (option.alternatives) {
                option.alternatives.forEach(obj => {
                    if (obj.name === tagInfo.tag) {
                        alternativeName = obj.alternative;
                    }
                });
            }
        }
        return alternativeName;
    }

    private getTagsInfoHeader(tagsInfo: TagInfo[]): TagInfoHeader | undefined {
        let isDescriptionOnly = false;
        const finalHeader: string[] = [];
        const headers = tagsInfo.map(x => this.getTagInfoHeader(x));
        let hasName = false;
        let hasType = false;
        let hasDefaultValue = false;
        let hasDescription = false;
        headers.forEach(header => {
            if (header) {
                if (header.includes('name')) {
                    hasName = true;
                }
                if (header.includes('type')) {
                    hasType = true;
                }
                if (header.includes('defaultValue')) {
                    hasDefaultValue = true;
                }
                if (header.includes('description')) {
                    hasDescription = true;
                }
            }
        });
        if (hasName) finalHeader.push('name');
        if (hasType) finalHeader.push('type');
        if (hasDefaultValue) finalHeader.push('defaultValue');
        if (hasDescription) finalHeader.push('description');
        isDescriptionOnly = hasDescription && !hasName && !hasType && !hasDefaultValue;
        return finalHeader.length === 0
            ? undefined
            : {
                  isDescriptionOnly: isDescriptionOnly,
                  headers: finalHeader,
              };
    }

    private getTagInfoHeader(tag: TagInfo): string[] | undefined {
        const headers: string[] = [];
        if (tag.name) {
            if (!headers.includes('name')) {
                headers.push('name');
            }
        }
        if (tag.type) {
            if (!headers.includes('type')) {
                headers.push('type');
            }
        }
        if (tag.defaultValue) {
            if (!headers.includes('defaultValue')) {
                headers.push('defaultValue');
            }
        }
        if (tag.description) {
            if (!headers.includes('description')) {
                headers.push('description');
            }
        }
        return headers.length === 0 ? undefined : headers;
    }
}
