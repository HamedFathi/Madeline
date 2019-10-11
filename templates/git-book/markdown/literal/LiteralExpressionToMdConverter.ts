import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { LiteralExpressionInfo } from '../../../../extractors/literal/LiteralExpressionInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { LiteralExpressionTemplateInfo } from './LiteralExpressionTemplateInfo';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { LITERAL_EXPRESSION_TEMPLATE } from './LiteralExpressionTemplate';
import { GetAccessorToMdConverter } from '../class/GetAccessorToMdConverter';
import { SetAccessorsToMdConverter } from '../class/SetAccessorToMdConverter';
import { MethodToMdConverter } from '../class/MethodToMdConverter';
import { LiteralAssignmentToMdConverter } from './LiteralAssignmentToMdConverter';

export class LiteralExpressionToMdConverter {
    constructor(
        private markdownUtils = new MarkdownUtils(),
        private literalAssignmentToMdConverter = new LiteralAssignmentToMdConverter(),
        private getAccessorToMdConverter = new GetAccessorToMdConverter(),
        private setAccessorsToMdConverter = new SetAccessorsToMdConverter(),
        private methodToMdConverter = new MethodToMdConverter(),
    ) {}
    public convert(
        literalExpressionInfo: LiteralExpressionInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const assignments: string[] = [];
        const getAccessors: string[] = [];
        const setAccessors: string[] = [];
        const methods: string[] = [];

        if (literalExpressionInfo.assignments) {
            literalExpressionInfo.assignments.forEach(item => {
                assignments.push(
                    this.literalAssignmentToMdConverter.convert(item, source, map, baseUrl, commentOptions),
                );
            });
        }

        if (literalExpressionInfo.getAccessors) {
            literalExpressionInfo.getAccessors.forEach(item => {
                getAccessors.push(this.getAccessorToMdConverter.convert(item, source, map, baseUrl, commentOptions));
            });
        }

        if (literalExpressionInfo.setAccessors) {
            literalExpressionInfo.setAccessors.forEach(item => {
                setAccessors.push(this.setAccessorsToMdConverter.convert(item, source, map, baseUrl, commentOptions));
            });
        }

        if (literalExpressionInfo.methods) {
            literalExpressionInfo.methods.forEach(item => {
                methods.push(this.methodToMdConverter.convert(item, source, map, baseUrl, commentOptions));
            });
        }

        const obj: LiteralExpressionTemplateInfo = {
            text: literalExpressionInfo.text,
            isObjectLiteral: literalExpressionInfo.isObjectLiteral,
            assignments: assignments.length === 0 ? undefined : assignments,
            getAccessors: getAccessors.length === 0 ? undefined : getAccessors,
            setAccessors: setAccessors.length === 0 ? undefined : setAccessors,
            methods: methods.length === 0 ? undefined : methods,
        };
        const text = Nunjucks.renderString(LITERAL_EXPRESSION_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
    public convertAll(
        literalExpressionsInfo: LiteralExpressionInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        literalExpressionsInfo.forEach(literalExpressionInfo => {
            const text = this.convert(literalExpressionInfo, source, map, baseUrl, commentOptions);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
