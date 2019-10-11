import { TypeMapInfo } from './../type/TypeMapInfo';
import { ExportedSourceFileInfo } from './../../../../extractors/source-file/ExportedSourceFileInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { PropertyInfo } from '../../../../extractors/property/PropertyInfo';
import { PropertyTemplateInfo } from './PropertyTemplateInfo';
import { DecoratorToMdConverter } from '../decorator/DecoratorToMdConverter';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { PROPERTY_TEMPLATE } from './PropertyTemplate';

export class PropertyToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeToMdConverter = new TypeToMdConverter(),
        private decoratorToMdConverter = new DecoratorToMdConverter(),
    ) {}
    public convert(
        propertyInfo: PropertyInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (propertyInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(propertyInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (propertyInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(propertyInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const decorators: string | undefined = propertyInfo.decorators
            ? this.decoratorToMdConverter.convert(propertyInfo.decorators, source, map, baseUrl)
            : undefined;
        const obj: PropertyTemplateInfo = {
            name: propertyInfo.name,
            description: description.length === 0 ? void 0 : description,
            decorators: decorators,
            initializer: propertyInfo.initializer,
            isOptional: propertyInfo.isOptional,
            modifiers: propertyInfo.modifiers,
            type: this.typeToMdConverter.convert(propertyInfo.id, propertyInfo.type, source, map, baseUrl),
            text: propertyInfo.text,
        };
        const text = Nunjucks.renderString(PROPERTY_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        propertiesInfo: PropertyInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        propertiesInfo.forEach(propertyInfo => {
            const text = this.convert(propertyInfo, source, map, baseUrl, commentOptions);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
