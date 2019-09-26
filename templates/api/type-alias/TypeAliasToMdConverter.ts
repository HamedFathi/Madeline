import { TypeAliasInfo } from '../../../extractors/type-alias/TypeAliasInfo';
import { TemplateOptions } from '../../TemplateOptions';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { PrettierUtils } from '../../../utilities/PrettierUtils';
import { MarkdownUtils } from '../../../utilities/MarkdownUtils';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { TypeAliasTemplateInfo } from './TypeAliasTemplateInfo';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { Nunjucks } from '../../../utilities/NunjucksUtils';
import { TYPE_ALIAS_TEMPLATE } from './TypeAliasTemplate';

export class TypeAliasToMdConverter {
    constructor(
        private commentToMdConverter = new CommentToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private prettierUtils = new PrettierUtils(),
        private markdownUtils = new MarkdownUtils(),
    ) {}
    public convert(
        typeAliasInfo: TypeAliasInfo,
        commentOptions?: CommentToMdOption,
        options?: TemplateOptions,
    ): string {
        const description: string[] = [];
        if (typeAliasInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(
                typeAliasInfo.leadingComments,
                commentOptions,
                options,
            );
            description.concat(leading);
        }
        if (typeAliasInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(
                typeAliasInfo.trailingComments,
                commentOptions,
                options,
            );
            description.concat(trailing);
        }
        const modules = typeAliasInfo.modules
            ? this.moduleToMdConverter.convert(typeAliasInfo.modules, commentOptions, options)
            : undefined;
        const typeParameters = typeAliasInfo.typeParameters
            ? typeAliasInfo.typeParameters.map(x => this.typeParameterToMdConverter.convert(x, options))
            : undefined;

        const obj: TypeAliasTemplateInfo = {
            initializer: typeAliasInfo.initializer,
            modules: modules,
            modifiers: typeAliasInfo.modifiers,
            name: typeAliasInfo.name,
            text: this.prettierUtils.prettify(typeAliasInfo.text),
            type: typeAliasInfo.type,
            typeParameters: typeParameters,
            hasComment: typeAliasInfo.hasComment,
            description: description.length === 0 ? undefined : description,
            options: options,
        };
        const text = Nunjucks.renderString(TYPE_ALIAS_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
