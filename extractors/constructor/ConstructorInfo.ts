import { ConstructorParameterInfo } from './ConstructorParameterInfo';
import { CommentInfo } from '../comment/CommentInfo';
export interface ConstructorInfo {
    isParameterLess: boolean;
    isImplementation: boolean;
    isOverload: boolean;
    modifiers: string[] | undefined;
    parameters: ConstructorParameterInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    text: string;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
    id: string;
    extension: string;
}
