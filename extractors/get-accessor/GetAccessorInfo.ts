import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
export interface GetAccessorInfo {
    name: string;
    returnType: TypeInfo;
    modifiers: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    text: string;
    typeParameters: TypeParameterInfo[] | undefined;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
    id: string;
    extension: string;
}
