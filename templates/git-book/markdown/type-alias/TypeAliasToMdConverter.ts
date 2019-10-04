import { prettify } from './../../../../utilities/PrettierUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { TypeAliasTemplateInfo } from './TypeAliasTemplateInfo';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { TYPE_ALIAS_TEMPLATE } from './TypeAliasTemplate';
import { TypeAliasInfo } from '../../../../extractors/type-alias/TypeAliasInfo';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';

export class TypeAliasToMdConverter {
    constructor(
        private commentToMdConverter = new CommentToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
    ) {}
    public convert(
        id: string,
        typeAliasInfo: TypeAliasInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (typeAliasInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(typeAliasInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (typeAliasInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(typeAliasInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const modules = typeAliasInfo.modules
            ? this.moduleToMdConverter.convert(typeAliasInfo.modules, commentOptions)
            : undefined;
        const typeParameters = typeAliasInfo.typeParameters
            ? typeAliasInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert(id, x, source, map, baseUrl),
              )
            : undefined;
        const type = this.typeToMdConverter.convert(id, typeAliasInfo.type, source, map, baseUrl);

        const obj: TypeAliasTemplateInfo = {
            initializer: typeAliasInfo.initializer,
            modules: modules,
            modifiers: typeAliasInfo.modifiers,
            name: typeAliasInfo.name,
            text: prettify(typeAliasInfo.text),
            type: type,
            typeParameters: typeParameters,
            hasComment: typeAliasInfo.hasComment,
            description: description.length === 0 ? undefined : description,
        };
        const text = Nunjucks.renderString(TYPE_ALIAS_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
