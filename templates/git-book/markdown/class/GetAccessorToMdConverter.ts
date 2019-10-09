import { TypeMapInfo } from '../type/TypeMapInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { GetAccessorInfo } from '../../../../extractors/get-accessor/GetAccessorInfo';
import { GetAccessorTemplateInfo } from './GetAccessorTemplateInfo';
import { DecoratorToMdConverter } from '../decorator/DecoratorToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { GET_ACCESSOR_TEMPLATE } from './GetAccessorTemplate';

export class GetAccessorToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeToMdConverter = new TypeToMdConverter(),
        private decoratorToMdConverter = new DecoratorToMdConverter(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
    ) {}
    public convert(
        getAccessorInfo: GetAccessorInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (getAccessorInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(getAccessorInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (getAccessorInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(getAccessorInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const decorators: string | undefined = getAccessorInfo.decorators
            ? this.decoratorToMdConverter.convert(getAccessorInfo.decorators, source, map, baseUrl)
            : undefined;
        const typeParameters = getAccessorInfo.typeParameters
            ? getAccessorInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert(getAccessorInfo.id, x, source, map, baseUrl),
              )
            : undefined;
        const obj: GetAccessorTemplateInfo = {
            name: getAccessorInfo.name,
            description: description.length === 0 ? void 0 : description,
            decorators: decorators,
            modifiers: getAccessorInfo.modifiers,
            typeParameters: typeParameters,
            returnType: this.typeToMdConverter.convert(
                getAccessorInfo.id,
                getAccessorInfo.returnType,
                source,
                map,
                baseUrl,
            ),
            text: getAccessorInfo.text,
        };
        const text = Nunjucks.renderString(GET_ACCESSOR_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        getAccessorsInfo: GetAccessorInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        getAccessorsInfo.forEach(getAccessorInfo => {
            const text = Nunjucks.renderString(GET_ACCESSOR_TEMPLATE, getAccessorInfo);
            const md = this.markdownUtils.purify(text);
            result.push(md);
        });
        return result.length === 0 ? void 0 : result;
    }
}
