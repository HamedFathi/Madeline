import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';

export interface PropertyInfo {
    name: string;
    type: TypeInfo;
    modifiers: string[] | undefined;
    isOptional: boolean;
    initializer: string | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    text: string;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
    id: string;
    extension: string;
}
