import { DecoratorParameterInfo } from './DecoratorParameterInfo';

export interface DecoratorInfo {
    name: string;
    parameters: DecoratorParameterInfo[] | undefined;
    isDecoratorFactory: boolean;
    text: string;
}
