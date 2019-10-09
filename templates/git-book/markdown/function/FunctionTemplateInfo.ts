import { FunctionParameterTemplateInfo } from './FunctionParameterTemplateInfo';

export interface FunctionTemplateInfo {
    isGenerator: boolean;
    isOverload: boolean | undefined;
    isImplementation: boolean | undefined;
    returnType: string | undefined;
    modules: string[] | undefined;
    parameters: FunctionParameterTemplateInfo[] | undefined;
    typeParameters: string[] | undefined;
    name: string | undefined;
    typeGuard: string | undefined;
    modifiers: string[] | undefined;
    description: string[] | undefined;
    text: string;
}
