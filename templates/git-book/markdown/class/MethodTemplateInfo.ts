import { MethodParameterTemplateInfo } from './MethodParameterTemplateInfo';

export interface MethodTemplateInfo {
    name: string;
    text: string;
    modifiers: string[] | undefined;
    returnType: string;
    isGenerator: boolean;
    parameters: MethodParameterTemplateInfo[] | undefined;
    description: string[] | undefined;
    decorators: string | undefined;
    typeParameters: string[] | undefined;
}
