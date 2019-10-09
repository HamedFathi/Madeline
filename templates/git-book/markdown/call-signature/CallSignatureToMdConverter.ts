import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CallSignatureInfo } from '../../../../extractors/common/CallSignatureInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { CallSignatureTemplateInfo } from './CallSignatureTemplateInfo';
import { CallSignatureParameterToMdConverter } from './CallSignatureParameterToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { CALL_SIGNATURE_TEMPLATE } from './CallSignatureTemplate';

export class CallSignatureToMdConverter {
    constructor(
        private typeToMdConverter: TypeToMdConverter = new TypeToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private callSignatureParameterToMdConverter = new CallSignatureParameterToMdConverter(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
    ) {}
    public convert(
        callSignatureInfo: CallSignatureInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
    ): string {
        const obj: CallSignatureTemplateInfo = {
            returnType: this.typeToMdConverter.convert('', callSignatureInfo.returnType, source, map, baseUrl),
            parameters: callSignatureInfo.parameters
                ? this.callSignatureParameterToMdConverter.convertAll(
                      callSignatureInfo.parameters,
                      source,
                      map,
                      baseUrl,
                  )
                : undefined,
            typeParameters: callSignatureInfo.typeParameters
                ? this.typeParameterToMdConverter.convertAll('', callSignatureInfo.typeParameters, source, map, baseUrl)
                : undefined,
        };
        const text = Nunjucks.renderString(CALL_SIGNATURE_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
