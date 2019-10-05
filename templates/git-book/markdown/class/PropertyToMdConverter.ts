import { TypeMapInfo } from './../type/TypeMapInfo';
import { ExportedSourceFileInfo } from './../../../../extractors/source-file/ExportedSourceFileInfo';
import { CommentToMdOption } from '../comment/CommentToMdOption';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { TypeParameterToMdConverter } from '../type-parameter/TypeParameterToMdConverter';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { PropertyInfo } from '../../../../extractors/property/PropertyInfo';

export class PropertyToMdConverter {
    constructor(
        private commentToMdConverter: CommentToMdConverter = new CommentToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private typeParameterToMdConverter = new TypeParameterToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
    ) {}
    public convert(
        propertyInfo: PropertyInfo,
        source: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        return '';
    }
}
