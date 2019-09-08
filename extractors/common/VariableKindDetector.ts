import { VariableKind } from './VariableKind';
import { SyntaxKind, VariableDeclaration } from 'ts-morph';

export class VariableKindDetector {
    public static detect(variableDeclaration: VariableDeclaration): VariableKind {
        if (variableDeclaration.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression).length > 0)
            return VariableKind.ObjectLiteral;
        else if (variableDeclaration.getDescendantsOfKind(SyntaxKind.ArrayLiteralExpression).length > 0)
            return VariableKind.ArrayLiteral;
        else if (variableDeclaration.getDescendantsOfKind(SyntaxKind.BindingElement).length > 0)
            return VariableKind.Destructuring;
        else
            return VariableKind.Variable;
    }
}
