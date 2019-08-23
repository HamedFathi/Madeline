import { TypeInfo } from '../common/TypeInfo';

export interface DecoratorInfo {
    name: string;
    params: TypeInfo[] | undefined;
    isDecoratorFactory: boolean;
}
