import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { LiteralInfo } from '../../../../extractors/literal/LiteralInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { LiteralExpressionToMdConverter } from './LiteralExpressionToMdConverter';
import { LiteralTemplateInfo } from './LiteralTemplateInfo';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { LITERAL_TEMPLATE } from './LiteralTemplate';

export class LiteralToMdConverter {
    constructor(
        private typeToMdConverter = new TypeToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private literalExpressionToMdConverter = new LiteralExpressionToMdConverter(),
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
    ) {}
    public convert(
        literalInfo: LiteralInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (literalInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(literalInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (literalInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(literalInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }

        const obj: LiteralTemplateInfo = {
            name: literalInfo.name,
            description: description.length === 0 ? void 0 : description,
            text: literalInfo.text,
            type: this.typeToMdConverter.convert(literalInfo.id, literalInfo.type, source, map, baseUrl),
            hasComment: literalInfo.hasComment,
            typeReference: literalInfo.typeReference,
            isArrayLiteral: literalInfo.isArrayLiteral,
            elements: this.literalExpressionToMdConverter.convertAll(
                literalInfo.elements,
                source,
                map,
                baseUrl,
                commentOptions,
            ),
        };
        const text = Nunjucks.renderString(LITERAL_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
