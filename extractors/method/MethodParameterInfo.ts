import { TypeInfo } from '../common/TypeInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';

export interface MethodParameterInfo {
    name: string;
    type: TypeInfo;
    text: string;
    modifiers: string[] | undefined;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    initializer: string | undefined;
    decorators: DecoratorInfo[] | undefined;
}
