import { CommentInfo } from '../comment/CommentInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { SetAccessorParamInfo } from './SetAccessorParameterInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
export interface SetAccessorInfo {
    name: string;
    text: string;
    parameter: SetAccessorParamInfo;
    modifiers: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    hasComment: boolean;
    typeParameters: TypeParameterInfo[] | undefined;
    path: string;
    file: string;
    directory: string;
    id: string;
    extension: string;
}
