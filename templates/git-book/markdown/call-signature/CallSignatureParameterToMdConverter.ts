import { CallSignatureParameterInfo } from '../../../../extractors/common/CallSignatureParameterInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { CallSignatureParameterTemplateInfo } from './CallSignatureParameterTemplateInfo';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { CALL_SIGNATURE_PARAMETER_TEMPLATE } from './CallSignatureParameterTemplate';
import { CommentToMdOption } from '../comment/CommentToMdOption';

export class CallSignatureParameterToMdConverter {
    constructor(
        private typeToMdConverter: TypeToMdConverter = new TypeToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
    ) {}
    public convert(
        callSignatureInfo: CallSignatureParameterInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string {
        const obj: CallSignatureParameterTemplateInfo = {
            initializer: callSignatureInfo.initializer,
            isOptional: callSignatureInfo.isOptional,
            isParameterProperty: callSignatureInfo.isParameterProperty,
            name: callSignatureInfo.name,
            isRest: callSignatureInfo.isRest,
            modifiers: callSignatureInfo.modifiers,
            type: this.typeToMdConverter.convert('', callSignatureInfo.type, source, map, baseUrl),
        };
        const text = Nunjucks.renderString(CALL_SIGNATURE_PARAMETER_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        callSignaturesInfo: CallSignatureParameterInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string[] | undefined {
        const result: string[] = [];
        callSignaturesInfo.forEach(callSignatureInfo => {
            const text = this.convert(callSignatureInfo, source, map, baseUrl);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
