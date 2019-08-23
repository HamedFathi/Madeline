import { ClassInfo } from '../class/ClassInfo';
import { ConstructorInfo } from '../constructor/ConstructorInfo';
import { GetAccessorInfo } from '../get-accessor/GetAccessorInfo';
import { MethodInfo } from '../method/MethodInfo';
import { PropertyInfo } from '../property/PropertyInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { NamespaceInfo } from '../namespace/NamespaceInfo';
export interface SourceFileClassInfo {
    name: string | undefined;
    text: string;
    modifiers: string[] | undefined;
    extends: string | undefined;
    implements: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    namespaces: NamespaceInfo[] | undefined;
    constructors: ConstructorInfo[] | undefined;
    getAccessors: GetAccessorInfo[] | undefined;
    methods: MethodInfo[] | undefined;
    properties: PropertyInfo[] | undefined;
}
