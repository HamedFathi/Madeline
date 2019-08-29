import { InterfaceMethodInfo } from './InterfaceMethodInfo';
import { InterfacePropertyInfo } from './InterfacePropertyInfo';
import { InterfaceExtendsInfo } from './InterfaceExtendsInfo';
import { InterfaceCallSignatureInfo } from './InterfaceCallSignatureInfo';
import { InterfaceIndexerInfo } from './InterfaceIndexerInfo';
import { InterfaceConstructorInfo } from './InterfaceConstructorInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { TypeParameterInfo } from '../common/TypeParameterInfo';

export interface InterfaceInfo {
    name: string;
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
}
