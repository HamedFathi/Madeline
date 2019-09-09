import { MethodDeclaration, InterfaceDeclaration, ClassDeclaration, FunctionDeclaration, CallSignatureDeclaration, ConstructSignatureDeclaration, MethodSignature, FunctionExpression } from 'ts-morph';
import { TypeParameterInfo } from '../common/TypeParameterInfo';

export class TypeParameterExtractor {
    public extract(node: MethodDeclaration | MethodSignature | FunctionExpression | ConstructSignatureDeclaration | CallSignatureDeclaration | InterfaceDeclaration | ClassDeclaration | FunctionDeclaration): TypeParameterInfo[] | undefined {
        let result = node.getTypeParameters().map(y => {
            return {
                name: y.getName(),
                constraint:
                    y.getConstraint() === undefined
                        ? undefined
                        : y
                            .getConstraintOrThrow()
                            .getType()
                            .getText(),
            };
        });
        return result.length === 0 ? undefined : result;
    }
}

