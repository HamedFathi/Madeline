import { DecoratorParameterTemplateInfo } from './DecoratorParameterTemplateInfo';

export interface DecoratorTemplateInfo {
    name: string;
    parameters: DecoratorParameterTemplateInfo[] | undefined;
    isDecoratorFactory: boolean;
}
