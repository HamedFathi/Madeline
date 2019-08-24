import { CommentInfo } from '../comment/CommentInfo';
import { DecoratorInfo } from '../decorator/DecoratorInfo';
import { NamespaceInfo } from '../namespace/NamespaceInfo';
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
    namespaces: NamespaceInfo[] | undefined;
    typeParameters: TypeParameterInfo[] | undefined;
}
