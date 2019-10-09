import { InterfaceParameterTemplateInfo } from './InterfaceParameterTemplateInfo';

export interface InterfaceConstructorTemplateInfo {
    parameters: InterfaceParameterTemplateInfo[] | undefined;
    returnType: string;
    text: string;
    description: string[] | undefined;
    typeParameters: string[] | undefined;
}
