import { ConstructorInfo } from '../constructor/ConstructorInfo';
import { GetAccessorInfo } from '../get-accessor/GetAccessorInfo';
import { MethodInfo } from '../method/MethodInfo';
import { PropertyInfo } from '../property/PropertyInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { CommentInfo } from '../comment/CommentInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { SetAccessorInfo } from '../set-accessor/SetAccessorInfo';
export interface SourceFileClassInfo {
    name: string | undefined;
    text: string;
    modifiers: string[] | undefined;
    extends: string | undefined;
    implements: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    constructors: ConstructorInfo[] | undefined;
    getAccessors: GetAccessorInfo[] | undefined;
    setAccessors: SetAccessorInfo[] | undefined;
    methods: MethodInfo[] | undefined;
    properties: PropertyInfo[] | undefined;
    path: string;
    file: string;
    directory: string;
    id: string;
}
