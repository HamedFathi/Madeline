import { TypeCategory } from './../common/TypeCategory';
import { TypeInfo } from '../common/TypeInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';

export interface TypeAliasInfo {
    name: string;
    text: string;
    modifiers: string[] | undefined;
    initializer: string;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    type: TypeInfo;
    typeParameters: TypeParameterInfo[] | undefined;
    hasComment: boolean;
    path: string;
    file: string;
    directory: string;
    extension: string;
    id: string;
    typeCategory: TypeCategory;
}
