import { TypeInfo } from '../../../extractors/common/TypeInfo';
import { TemplateOptions } from '../../TemplateOptions';

export interface TypeAliasTemplateInfo {
    name: string;
    text: string;
    modifiers: string[] | undefined;
    initializer: string;
    description: string[] | undefined;
    modules: string[] | undefined;
    type: TypeInfo;
    typeParameters: string[] | undefined;
    hasComment: boolean;
    option?: TemplateOptions;
}
