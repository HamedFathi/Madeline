import { VariableStatement } from 'ts-morph';
import { TypeExtractor } from '../common/TypeExtractor';
import { VariableInfo } from './VariableInfo';

export class VariableExtractor {
    public extract(node : VariableStatement): VariableInfo[] | undefined {
        let modifiers = node.getModifiers().map(x => x.getText());
        let kind = node.getDeclarationKind();
        let kindName = node.getDeclarationKind().toString();
        let vars = node.getDeclarationList().getDeclarations().map(x => {
            return {
                name: x.getName(),
                type: new TypeExtractor().extract(x.getType()),
                modifiers: modifiers.length === 0
                    ? undefined
                    : modifiers,
                defaultValue: x.getInitializer() === undefined
                    ? undefined
                    : x.getInitializerOrThrow().getText(),
                kind: kind,
                kindName: kindName
            };
        });
        return vars.length === 0
            ? undefined
            : vars;
    }
}


