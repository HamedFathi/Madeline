import { DecoratorParameterInfo } from './DecoratorParameterInfo';

export interface DecoratorInfo {
    name: string;
    parameters: DecoratorParameterInfo[] | undefined;
    isDecoratorFactory: boolean;
    text: string;
    path: string;
    file: string;
    directory: string;
    id: string;
    extension: string;
}
