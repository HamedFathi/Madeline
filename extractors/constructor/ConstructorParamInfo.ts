import { TypeInfo } from '../common/TypeInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';

export interface ConstructorParamInfo {
    name: string;
    type: TypeInfo;
    modifiers: string[] | undefined,
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    defaultValue: string | undefined;
    decorators: DecoratorInfo[] | undefined;
}

