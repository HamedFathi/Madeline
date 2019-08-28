import { VariableDeclarationKind } from 'ts-morph';
import { TypeInfo } from '../common/TypeInfo';
export interface VariableInfo {
    name: string;
    type: TypeInfo;
    modifiers: string[] | undefined;
    kind: VariableDeclarationKind;
    kindName: string;
}
