import { TypeCategory } from './../common/TypeCategory';
import { FunctionParamInfo } from './FunctionParameterInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
import { TypeInfo } from '../common/TypeInfo';
export interface FunctionInfo {
    name: string | undefined;
    modifiers: string[] | undefined;
    isGenerator: boolean;
    isOverload?: boolean;
    isImplementation?: boolean;
    returnType: TypeInfo | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules?: ModuleInfo[] | undefined;
    parameters: FunctionParamInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
    text: string;
    hasComment: boolean;
    path: string;
    file: string;
    extension: string;
    directory: string;
    id: string;
    typeCategory: TypeCategory;
}
