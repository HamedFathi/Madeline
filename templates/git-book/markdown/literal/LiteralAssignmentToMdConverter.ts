import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { LiteralAssignmentInfo } from '../../../../extractors/literal/LiteralAssignmentInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { LiteralAssignmentTemplateInfo } from './LiteralAssignmentTemplateInfo';
import { LITERAL_ASSIGNMENT_TEMPLATE } from './LiteralAssignmentTemplate';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { CallSignatureInfo } from '../../../../extractors/common/CallSignatureInfo';
import { FunctionInfo } from '../../../../extractors/function/FunctionInfo';
import { LiteralExpressionInfo } from '../../../../extractors/literal/LiteralExpressionInfo';
import { ObjectUtils } from '../../../../utilities/ObjectUtils';
import { FunctionToMdConverter } from '../function/FunctionToMdConverter';
import { CallSignatureToMdConverter } from '../call-signature/CallSignatureToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { LiteralExpressionToMdConverter } from './LiteralExpressionToMdConverter';

export class LiteralAssignmentToMdConverter {
    constructor(
        private typeToMdConverter = new TypeToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private objectUtils = new ObjectUtils(),
        private functionToMdConverter = new FunctionToMdConverter(),
        private callSignatureToMdConverter = new CallSignatureToMdConverter(),
        private literalExpressionToMdConverter = new LiteralExpressionToMdConverter(),
    ) {}
    private isCallSignatureInfo(object: any): object is CallSignatureInfo {
        return !('isGenerator' in object);
    }

    private isFunctionInfo(object: any): object is FunctionInfo {
        return 'isGenerator' in object;
    }

    private isLiteralExpressionInfo(object: any): object is LiteralExpressionInfo {
        return 'isObjectLiteral' in object;
    }

    public convert(
        literalAssignmentInfo: LiteralAssignmentInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        let value: string | undefined = undefined;
        if (literalAssignmentInfo.value) {
            if (this.isCallSignatureInfo(literalAssignmentInfo.value)) {
                value = this.callSignatureToMdConverter.convert(
                    literalAssignmentInfo.value as CallSignatureInfo,
                    source,
                    map,
                    baseUrl,
                );
            }
            if (this.isFunctionInfo(literalAssignmentInfo.value)) {
                value = this.functionToMdConverter.convert(
                    literalAssignmentInfo.value as FunctionInfo,
                    source,
                    map,
                    baseUrl,
                    commentOptions,
                );
            }
            if (this.objectUtils.isString(literalAssignmentInfo.value)) {
                value = literalAssignmentInfo.value as string;
            }
            if (this.isLiteralExpressionInfo(literalAssignmentInfo.value)) {
                value = this.literalExpressionToMdConverter.convert(
                    literalAssignmentInfo.value as LiteralExpressionInfo,
                    source,
                    map,
                    baseUrl,
                    commentOptions,
                );
            }
        }
        const obj: LiteralAssignmentTemplateInfo = {
            isShorthand: literalAssignmentInfo.isShorthand,
            isSpread: literalAssignmentInfo.isSpread,
            name: literalAssignmentInfo.name,
            value: value,
            type: this.typeToMdConverter.convert('', literalAssignmentInfo.type, source, map, baseUrl),
        };
        const text = Nunjucks.renderString(LITERAL_ASSIGNMENT_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
    public convertAll(
        literalAssignmentsInfo: LiteralAssignmentInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string[] | undefined {
        const result: string[] = [];
        literalAssignmentsInfo.forEach(literalAssignmentInfo => {
            const text = this.convert(literalAssignmentInfo, source, map, baseUrl);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
