import { InterfaceParameterTemplateInfo } from './InterfaceParameterTemplateInfo';

export interface InterfaceMethodTemplateInfo {
    parameters: string[] | undefined;
    returnType: string;
    text: string;
    description: string[] | undefined;
    typeParameters: string[] | undefined;
    name: string | undefined;
}
