import { ConstructorParamInfo } from './ConstructorParamInfo';
import { CommentInfo } from '../comment/CommentInfo';
export interface ConstructorInfo {
    isParameterLess: boolean;
    isImplementation: boolean;
    isOverload: boolean;
    modifiers: string[] | undefined;
    params: ConstructorParamInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
}
