import { TypeMapInfo } from './../type/TypeMapInfo';
import { ExportedSourceFileInfo } from './../../../../extractors/source-file/ExportedSourceFileInfo';
import { ClassInfo } from '../../../../extractors/class/ClassInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { ClassTemplateInfo } from './ClassTemplateInfo';
import { DecoratorToMdConverter } from '../decorator/DecoratorToMdConverter';
import { Nunjucks } from '../../../../utilities/NunjucksUtils';
import { CLASS_TEMPLATE } from './ClassTemplate';
import { PropertyInfo } from '../../../../extractors/property/PropertyInfo';
import { GetAccessorInfo } from '../../../../extractors/get-accessor/GetAccessorInfo';
import { MethodInfo } from '../../../../extractors/method/MethodInfo';
import { SetAccessorInfo } from '../../../../extractors/set-accessor/SetAccessorInfo';
import { PropertyToMdConverter } from './PropertyToMdConverter';
import { GetAccessorToMdConverter } from './GetAccessorToMdConverter';
import { SetAccessorsToMdConverter } from './SetAccessorToMdConverter';
import { MethodToMdConverter } from './MethodToMdConverter';
import { SourceFileClassInfo } from '../../../../extractors/source-file/SourceFileClassInfo';

export class ClassToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
        private decoratorToMdConverter = new DecoratorToMdConverter(),
        private propertyToMdConverter = new PropertyToMdConverter(),
        private getAccessorToMdConverter = new GetAccessorToMdConverter(),
        private setAccessorsToMdConverter = new SetAccessorsToMdConverter(),
        private methodToMdConverter = new MethodToMdConverter(),
    ) {}

    public convertSourceFileClassInfo(
        sourceFileClassInfo: SourceFileClassInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ) {
        const description: string[] = [];
        if (sourceFileClassInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(sourceFileClassInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (sourceFileClassInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(sourceFileClassInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const decorators: string | undefined = sourceFileClassInfo.decorators
            ? this.decoratorToMdConverter.convert(sourceFileClassInfo.decorators, source, map, baseUrl)
            : undefined;
        const typeParameters = sourceFileClassInfo.typeParameters
            ? sourceFileClassInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert(sourceFileClassInfo.id, x, source, map, baseUrl),
              )
            : undefined;
        const obj: ClassTemplateInfo = {
            name: sourceFileClassInfo.name,
            description: description.length === 0 ? void 0 : description,
            decorators: decorators,
            extends: sourceFileClassInfo.extends,
            implements: sourceFileClassInfo.implements,
            modules: sourceFileClassInfo.modules
                ? this.moduleToMdConverter.convert(sourceFileClassInfo.modules, commentOptions)
                : undefined,
            modifiers: sourceFileClassInfo.modifiers,
            text: sourceFileClassInfo.text,
            typeParameters: typeParameters,
            properties:
                !sourceFileClassInfo.properties || sourceFileClassInfo.properties.length === 0
                    ? void 0
                    : this.propertyToMdConverter.convertAll(
                          sourceFileClassInfo.properties as PropertyInfo[],
                          source,
                          map,
                          baseUrl,
                          commentOptions,
                      ),
            methods:
                !sourceFileClassInfo.methods || sourceFileClassInfo.methods.length === 0
                    ? void 0
                    : this.methodToMdConverter.convertAll(
                          sourceFileClassInfo.methods as MethodInfo[],
                          source,
                          map,
                          baseUrl,
                          commentOptions,
                      ),
            getAccessors:
                !sourceFileClassInfo.getAccessors || sourceFileClassInfo.getAccessors.length === 0
                    ? void 0
                    : this.getAccessorToMdConverter.convertAll(
                          sourceFileClassInfo.getAccessors as GetAccessorInfo[],
                          source,
                          map,
                          baseUrl,
                          commentOptions,
                      ),
            setAccessors:
                !sourceFileClassInfo.setAccessors || sourceFileClassInfo.setAccessors.length === 0
                    ? void 0
                    : this.setAccessorsToMdConverter.convertAll(
                          sourceFileClassInfo.setAccessors as SetAccessorInfo[],
                          source,
                          map,
                          baseUrl,
                          commentOptions,
                      ),
        };
        const text = Nunjucks.renderString(CLASS_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }

    public convert(
        classInfo: ClassInfo,
        propertiesInfo: PropertyInfo[],
        getAccessorsInfo: GetAccessorInfo[],
        setAccessorsInfo: SetAccessorInfo[],
        methodsInfo: MethodInfo[],
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        const description: string[] = [];
        if (classInfo.leadingComments) {
            const leading = this.commentToMdConverter.convertAll(classInfo.leadingComments, commentOptions);
            description.concat(leading);
        }
        if (classInfo.trailingComments) {
            const trailing = this.commentToMdConverter.convertAll(classInfo.trailingComments, commentOptions);
            description.concat(trailing);
        }
        const decorators: string | undefined = classInfo.decorators
            ? this.decoratorToMdConverter.convert(classInfo.decorators, source, map, baseUrl)
            : undefined;
        const typeParameters = classInfo.typeParameters
            ? classInfo.typeParameters.map(x =>
                  this.typeParameterToMdConverter.convert(classInfo.id, x, source, map, baseUrl),
              )
            : undefined;
        const obj: ClassTemplateInfo = {
            name: classInfo.name,
            description: description.length === 0 ? void 0 : description,
            decorators: decorators,
            extends: classInfo.extends,
            implements: classInfo.implements,
            modules: classInfo.modules
                ? this.moduleToMdConverter.convert(classInfo.modules, commentOptions)
                : undefined,
            modifiers: classInfo.modifiers,
            text: classInfo.text,
            typeParameters: typeParameters,
            properties:
                propertiesInfo.length === 0
                    ? void 0
                    : this.propertyToMdConverter.convertAll(propertiesInfo, source, map, baseUrl, commentOptions),
            methods:
                methodsInfo.length === 0
                    ? void 0
                    : this.methodToMdConverter.convertAll(methodsInfo, source, map, baseUrl, commentOptions),
            getAccessors:
                getAccessorsInfo.length === 0
                    ? void 0
                    : this.getAccessorToMdConverter.convertAll(getAccessorsInfo, source, map, baseUrl, commentOptions),
            setAccessors:
                setAccessorsInfo.length === 0
                    ? void 0
                    : this.setAccessorsToMdConverter.convertAll(setAccessorsInfo, source, map, baseUrl, commentOptions),
        };
        const text = Nunjucks.renderString(CLASS_TEMPLATE, obj);
        const md = this.markdownUtils.purify(text);
        return md;
    }
}
