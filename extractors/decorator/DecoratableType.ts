import {
    ClassDeclaration,
    MethodDeclaration,
    PropertyDeclaration,
    GetAccessorDeclaration,
    ParameterDeclaration,
    SetAccessorDeclaration,
} from 'ts-morph';
export type DecoratableType =
    | ClassDeclaration
    | MethodDeclaration
    | PropertyDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | ParameterDeclaration;
