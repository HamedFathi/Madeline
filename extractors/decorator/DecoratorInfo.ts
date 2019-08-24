import { TypeInfo } from '../common/TypeInfo';

export interface DecoratorInfo {
    name: string;
    parameters: TypeInfo[] | undefined;
    isDecoratorFactory: boolean;
}
