import {
    MethodDeclaration,
    InterfaceDeclaration,
    ClassDeclaration,
    FunctionDeclaration,
    CallSignatureDeclaration,
    ConstructSignatureDeclaration,
    MethodSignature,
    FunctionExpression,
    TypeAliasDeclaration,
} from 'ts-morph';
import { TypeParameterInfo } from './TypeParameterInfo';
import { TypeExtractor } from '../common/TypeExtractor';

export class TypeParameterExtractor {
    public extract(
        node:
            | MethodDeclaration
            | MethodSignature
            | FunctionExpression
            | ConstructSignatureDeclaration
            | CallSignatureDeclaration
            | InterfaceDeclaration
            | ClassDeclaration
            | FunctionDeclaration
            | TypeAliasDeclaration,
    ): TypeParameterInfo[] | undefined {
        const result = node.getTypeParameters().map(y => {
            return {
                name: y.getName(),
                text: y.getText(),
                constraint:
                    y.getConstraint() === undefined
                        ? undefined
                        : new TypeExtractor().extract(y.getConstraintOrThrow().getType(), undefined, undefined),
            };
        });
        return result.length === 0 ? undefined : result;
    }
}
