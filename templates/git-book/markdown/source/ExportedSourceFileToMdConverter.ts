import { CommentToMdOption } from './../comment/CommentToMdOption';
import { ExportedSourceFileInfo } from './../../../../extractors/source-file/ExportedSourceFileInfo';
import { CommentToMdConverter } from '../comment/CommentToMdConverter';
import { ModuleToMdConverter } from '../module/ModuleToMdConverter';
import { TypeToMdConverter } from '../type/TypeToMdConverter';
import { MarkdownUtils } from '../../../../utilities/MarkdownUtils';
import { FunctionToMdConverter } from '../function/FunctionToMdConverter';
import { FromTypeInfo } from '../../../../extractors/common/FromTypeInfo';
import { TypeMapInfo } from '../type/TypeMapInfo';

export class ExportedSourceFileToMdConverter {
    constructor(
        private commentToMdConverter = new CommentToMdConverter(),
        private moduleToMdConverter = new ModuleToMdConverter(),
        private typeToMdConverter = new TypeToMdConverter(),
        private markdownUtils = new MarkdownUtils(),
        private functionToMdConverter = new FunctionToMdConverter(),
    ) { }
    public convert(
        exportedSourceFileInfo: ExportedSourceFileInfo,
        map: (id: string, from: FromTypeInfo[], source: ExportedSourceFileInfo, baseUrl?: string) => TypeMapInfo[],
        baseUrl?: string,
        commentOptions?: CommentToMdOption,
    ): string {
        return '';
    }
}