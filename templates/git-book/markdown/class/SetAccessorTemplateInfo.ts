import { SetAccessorParameterTemplateInfo } from './SetAccessorParameterTemplateInfo';

export interface SetAccessorTemplateInfo {
    name: string;
    text: string;
    parameter: SetAccessorParameterTemplateInfo;
    modifiers: string[] | undefined;
    description: string[] | undefined;
    decorators: string | undefined;
    typeParameters: string[] | undefined;
}
