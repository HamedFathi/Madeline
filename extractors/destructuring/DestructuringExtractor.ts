import { VariableStatement, SyntaxKind } from 'ts-morph';
import { DestructuringInfo } from './DestructuringInfo';
import { DestructuringElementInfo } from './DestructuringElementInfo';

export class DestructuringExtractor {
    public extract(node: VariableStatement): DestructuringInfo[] | undefined {
        let result: DestructuringInfo[] = [];
        node.getDeclarations().forEach(declaration => {
            let elements: DestructuringElementInfo[] = [];
            let bindingElements = declaration.getDescendantsOfKind(SyntaxKind.BindingElement);
            if (bindingElements.length > 0) {
                let defaultValue = declaration.getInitializer() === undefined ? undefined : declaration.getInitializerOrThrow().getText();
                let isArrayDestructuring = declaration.getDescendantsOfKind(SyntaxKind.ArrayBindingPattern).length > 0;
                bindingElements.forEach(element => {
                    let name = element.getName();
                    let propertyName = element.getPropertyNameNode() === undefined
                        ? undefined : element.getPropertyNameNodeOrThrow().getText()
                    let isRest = element.getDotDotDotToken() !== undefined;
                    elements.push({
                        name: name,
                        propertyName: propertyName,
                        isRest: isRest
                    });
                });
                result.push({
                    isArrayDestructuring: isArrayDestructuring,
                    elements: elements,
                    defaultValue: defaultValue
                });
            }
        });
        return result.length === 0 ? undefined : result;
    }
}

