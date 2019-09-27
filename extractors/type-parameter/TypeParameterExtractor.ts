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
                    y.getConstraint() === void 0
                        ? void 0
                        : new TypeExtractor().extract(y.getConstraintOrThrow().getType(), void 0, void 0),
            };
        });
        return result.length === 0 ? void 0 : result;
    }
}
