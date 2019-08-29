import { CommentInfo } from '../comment/CommentInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { ModuleInfo } from '../module/ModuleInfo';
import { TypeParameterInfo } from '../common/TypeParameterInfo';

export interface ClassInfo {
    name: string | undefined;
    text: string;
    modifiers: string[] | undefined;
    extends: string | undefined;
    implements: string[] | undefined;
    trailingComments: CommentInfo[] | undefined;
    leadingComments: CommentInfo[] | undefined;
    decorators: DecoratorInfo[] | undefined;
    modules: ModuleInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
}
