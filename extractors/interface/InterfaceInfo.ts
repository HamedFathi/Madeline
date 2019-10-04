import { InterfaceMethodInfo } from './InterfaceMethodInfo';
import { InterfacePropertyInfo } from './InterfacePropertyInfo';
import { InterfaceExtendsInfo } from './InterfaceExtendsInfo';
import { InterfaceCallSignatureInfo } from './InterfaceCallSignatureInfo';
import { InterfaceIndexerInfo } from './InterfaceIndexerInfo';
import { InterfaceConstructorInfo } from './InterfaceConstructorInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { TypeParameterInfo } from '../type-parameter/TypeParameterInfo';
import { TypeCategory } from '../common/TypeCategory';

export interface InterfaceInfo {
    name: string;
    text: string;
    modifiers: string[] | undefined;
    constructors: InterfaceConstructorInfo[] | undefined;
    properties: InterfacePropertyInfo[] | undefined;
    methods: InterfaceMethodInfo[] | undefined;
    callSignatures: InterfaceCallSignatureInfo[] | undefined;
    indexers: InterfaceIndexerInfo[] | undefined;
    extends: InterfaceExtendsInfo[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
    hasComment: boolean;
    path: string;
    file: string;
    extension: string;
    directory: string;
    id: string;
    typeCategory: TypeCategory;
}
