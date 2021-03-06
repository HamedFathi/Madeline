import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { VariableInfo } from '../../../../extractors/variable/VariableInfo';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { VariableTemplateInfo } from './VariableTemplateInfo';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { VARIABLE_TEMPLATE } from './VariableTemplate';
import { FunctionInfo } from '../../../../extractors/function/FunctionInfo';
import { CallSignatureInfo } from '../../../../extractors/common/CallSignatureInfo';
import { ObjectUtils } from '../../../../utilities/ObjectUtils';
import { FunctionToMdConverter } from '../function/FunctionToMdConverter';
import { CallSignatureToMdConverter } from '../call-signature/CallSignatureToMdConverter';

export class VariableToMdConverter {
    constructor(
        private commentToMdConverter = new CommentToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private objectUtils = new ObjectUtils(),
        private functionToMdConverter = new FunctionToMdConverter(),
        private callSignatureToMdConverter = new CallSignatureToMdConverter(),
    ) {}

    private isCallSignatureInfo(/* eslint-disable */object: any/* eslint-disable */): object is CallSignatureInfo {
        return  object && this.objectUtils.isObject(object) && !('isGenerator' in object);
    }

    private isFunctionInfo(/* eslint-disable */object: any/* eslint-disable */): object is FunctionInfo {
        return  object && this.objectUtils.isObject(object) &&'isGenerator' in object;
    }

    public convert(
        variableInfo: VariableInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (variableInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(variableInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (variableInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(variableInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const modules = variableInfo.modules
            ? this.moduleToMdConverter.convert(variableInfo.modules, commentOptions)
            : undefined;

        const type = this.typeToMdConverter.convert(variableInfo.id, variableInfo.type, source, map, baseUrl);
        let initializer: string | undefined = undefined;
        if (variableInfo.initializer) {
            if (this.isCallSignatureInfo(variableInfo.initializer)) {
                initializer = this.callSignatureToMdConverter.convert(
                    variableInfo.initializer as CallSignatureInfo,
                    source,
                    map,
                    baseUrl,
                );
            }
            if (this.isFunctionInfo(variableInfo.initializer)) {
                initializer = this.functionToMdConverter.convert(
                    variableInfo.initializer as FunctionInfo,
                    source,
                    map,
                    baseUrl,
                    commentOptions,
                );
            }
            if (this.objectUtils.isString(variableInfo.initializer)) {
                initializer = variableInfo.initializer as string;
            }
        }
        const obj: VariableTemplateInfo = {
            description: description.length === 0 ? undefined : description,
            modules: modules,
            modifiers: variableInfo.modifiers,
            name: variableInfo.name,
            text: variableInfo.text,
            kindName: variableInfo.kindName,
            type: type,
            typeReference: variableInfo.typeReference,
            initializer: initializer,
        };
        const text = Nunjucks.renderString(VARIABLE_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
