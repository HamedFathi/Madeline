import { VariableStatement, SyntaxKind } from 'ts-morph';
import { DestructuringInfo } from './DestructuringInfo';
import { DestructuringElementInfo } from './DestructuringElementInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ModuleExtractor } from '../module/ModuleExtractor';

/*
const { cooked, expressions } = expr;
const {"some property": someProperty} = obj;
var {w, x, ...remaining} = {w: 1, x: 2, y: 3, z: 4};
var [x, y, ...remaining] = [1, 2, 3, 4];
var [x, , ...remaining] = [1, 2, 3, 4];

let obj: any = {};
interface x {
  "some property": any;
}
const { "some property": someProperty } = obj;
const { "some property": someProperty } = obj as unknown as any as x;
*/
export class DestructuringExtractor {
    public extract(node: VariableStatement): DestructuringInfo[] | undefined {
        let result: DestructuringInfo[] = [];
        const modifiers = node.getModifiers().map(x => x.getText());
        const kind = node.getDeclarationKind();
        const kindName = node.getDeclarationKind().toString();
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const modules = new ModuleExtractor().extract(node);
        const nodeText = node.getText();
        node.getDeclarations().forEach(declaration => {
            let elements: DestructuringElementInfo[] = [];
            let bindingElements = declaration.getDescendantsOfKind(SyntaxKind.BindingElement);
            if (bindingElements.length > 0) {
                let typeReference: string | undefined = undefined;
                let initValue = declaration.getInitializer();
                let text = declaration.getText();
                let initializer = initValue === undefined ? undefined : declaration.getInitializerOrThrow().getText();
                if (initValue) {
                    let typeRef = declaration.getDescendantsOfKind(SyntaxKind.TypeReference);
                    typeReference = typeRef.length === 0 ? undefined : typeRef[0].getText();
                }
                let isArrayDestructuring = declaration.getDescendantsOfKind(SyntaxKind.ArrayBindingPattern).length > 0;
                bindingElements.forEach(element => {
                    let name = element.getName();
                    let propertyName = element.getPropertyNameNode() === undefined
                        ? undefined : element.getPropertyNameNodeOrThrow().getText()
                    let isRest = element.getDotDotDotToken() !== undefined;
                    elements.push({
                        name: name,
                        propertyName: propertyName,
                        isRest: isRest,
                        text: text
                    });
                });
                result.push({
                    isArrayDestructuring: isArrayDestructuring,
                    elements: elements,
                    initializer: initializer,
                    kind: kind,
                    kindName: kindName,
                    leadingComments: leadingComments,
                    trailingComments: trailingComments,
                    modifiers: modifiers,
                    modules: modules,
                    typeReference: typeReference,
                    text: nodeText
                });
            }
        });
        return result.length === 0 ? undefined : result;
    }
}

