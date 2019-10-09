import { TypeMapInfo } from '../type/TypeMapInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { SetAccessorInfo } from '../../../../extractors/set-accessor/SetAccessorInfo';
import { SetAccessorTemplateInfo } from './SetAccessorTemplateInfo';
import { DecoratorToMdConverter } from '../decorator/DecoratorToMdConverter';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { SET_ACCESSOR_TEMPLATE } from './SetAccessorTemplate';

export class SetAccessorsToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private decoratorToMdConverter = new DecoratorToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
    ) {}
    public convert(
        setAccessorInfo: SetAccessorInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (setAccessorInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(setAccessorInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (setAccessorInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(setAccessorInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const typeParameters = setAccessorInfo.typeParameters
            ? setAccessorInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert(setAccessorInfo.id, x, source, map, baseUrl),
              )
            : undefined;
        const obj: SetAccessorTemplateInfo = {
            name: setAccessorInfo.name,
            modifiers: setAccessorInfo.modifiers,
            decorators: setAccessorInfo.decorators
                ? this.decoratorToMdConverter.convert(setAccessorInfo.decorators, source, map, baseUrl)
                : undefined,
            description: description.length === 0 ? void 0 : description,
            text: setAccessorInfo.text,
            parameter: {
                name: setAccessorInfo.parameter.name,
                text: setAccessorInfo.parameter.text,
                modifiers: setAccessorInfo.parameter.modifiers,
                type: this.typeToMdConverter.convert(
                    setAccessorInfo.id,
                    setAccessorInfo.parameter.type,
                    source,
                    map,
                    baseUrl,
                ),
            },
            typeParameters: typeParameters,
        };
        const text = Nunjucks.renderString(SET_ACCESSOR_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
    public convertAll(
        setAccessorsInfo: SetAccessorInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        setAccessorsInfo.forEach(setAccessorInfo => {
            const text = Nunjucks.renderString(SET_ACCESSOR_TEMPLATE, setAccessorInfo);
            const md = this.markdownUtils.purify(text);
            result.push(md);
        });
        return result.length === 0 ? void 0 : result;
    }
}
