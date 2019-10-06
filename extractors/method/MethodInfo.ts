import { MethodParameterInfo } from './MethodParameterInfo';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
export interface MethodInfo {
    name: string;
    text: string;
    modifiers: string[] | undefined;
    returnType: TypeInfo;
    isGenerator: boolean;
    parameters: MethodParameterInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
    id: string;
    extension: string;
}
