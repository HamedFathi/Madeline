import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { ExportedSourceFileInfo } from '../../../../extractors/source-file/ExportedSourceFileInfo';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';
import { InterfaceInfo } from '../../../../extractors/interface/InterfaceInfo';
import { INTERFACE_TEMPLATE } from './InterfaceTemplate';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { InterfaceTemplateInfo } from './InterfaceTemplateInfo';
import { InterfaceExtendsToMdConverter } from './InterfaceExtendsToMdConverter';
import { InterfacePropertyToMdConverter } from './InterfacePropertyToMdConverter';
import { InterfaceIndexerToMdConverter } from './InterfaceIndexerToMdConverter';
import { InterfaceMethodToMdConverter } from './InterfaceMethodToMdConverter';
import { InterfaceConstructorToMdConverter } from './InterfaceConstructorToMdConverter';
import { InterfaceCallSignatureToMdConverter } from './InterfaceCallSignatureToMdConverter';

export class InterfaceToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
        private interfaceExtendsToMdConverter = new InterfaceExtendsToMdConverter(),
        private interfacePropertyToMdConverter = new InterfacePropertyToMdConverter(),
        private interfaceIndexerToMdConverter = new InterfaceIndexerToMdConverter(),
        private interfaceMethodToMdConverter = new InterfaceMethodToMdConverter(),
        private interfaceConstructorToMdConverter = new InterfaceConstructorToMdConverter(),
        private interfaceCallSignatureToMdConverter = new InterfaceCallSignatureToMdConverter(),
    ) {}
    public convert(
        interfaceInfo: InterfaceInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (interfaceInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(interfaceInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (interfaceInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(interfaceInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const typeParameters = interfaceInfo.typeParameters
            ? interfaceInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert(interfaceInfo.id, x, source, map, baseUrl),
              )
            : undefined;

        const modules = interfaceInfo.modules
            ? this.moduleToMdConverter.convert(interfaceInfo.modules, commentOptions)
            : undefined;
        const obj: InterfaceTemplateInfo = {
            name: interfaceInfo.name,
            extends: interfaceInfo.extends
                ? this.interfaceExtendsToMdConverter.convertAll(interfaceInfo.extends, source, map, baseUrl)
                : undefined,
            typeParameters: typeParameters,
            description: description.length === 0 ? void 0 : description,
            text: interfaceInfo.text,
            modifiers: interfaceInfo.modifiers,
            modules: modules,
            methods: interfaceInfo.methods
                ? this.interfaceMethodToMdConverter.convertAll(interfaceInfo.methods, source, map, baseUrl)
                : undefined,
            properties: interfaceInfo.properties
                ? this.interfacePropertyToMdConverter.convertAll(interfaceInfo.properties, source, map, baseUrl)
                : undefined,
            indexers: interfaceInfo.indexers
                ? this.interfaceIndexerToMdConverter.convertAll(interfaceInfo.indexers, source, map, baseUrl)
                : undefined,
            callSignatures: interfaceInfo.callSignatures
                ? this.interfaceCallSignatureToMdConverter.convertAll(
                      interfaceInfo.callSignatures,
                      source,
                      map,
                      baseUrl,
                  )
                : undefined,
            constructors: interfaceInfo.constructors
                ? this.interfaceConstructorToMdConverter.convertAll(interfaceInfo.constructors, source, map, baseUrl)
                : undefined,
        };
        const text = Nunjucks.renderString(INTERFACE_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convertAll(
        interfacesInfo: InterfaceInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string[] | undefined {
        const result: string[] = [];
        interfacesInfo.forEach(interfaceInfo => {
            const text = this.convert(interfaceInfo, source, map, baseUrl, commentOptions);
            result.push(text);
        });
        return result.length === 0 ? void 0 : result;
    }
}
