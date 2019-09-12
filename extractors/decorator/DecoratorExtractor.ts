import {
    ClassDeclaration,
    MethodDeclaration,
    PropertyDeclaration,
    GetAccessorDeclaration,
    ParameterDeclaration,
    SetAccessorDeclaration,
    SyntaxKind,
} from 'ts-morph';
import { DecoratorInfo } from './DecoratorInfo';
import { TypeExtractor } from '../common/TypeExtractor';

const allowedKinds: SyntaxKind[] = [
    SyntaxKind.ClassDeclaration,
    SyntaxKind.MethodDeclaration,
    SyntaxKind.PropertyDeclaration,
    SyntaxKind.GetAccessor,
    SyntaxKind.SetAccessor,
    SyntaxKind.Parameter,
];

export class DecoratorExtractor {
    public extract(
        node:
            | ClassDeclaration
            | MethodDeclaration
            | PropertyDeclaration
            | GetAccessorDeclaration
            | SetAccessorDeclaration
            | ParameterDeclaration,
        filterStrategy?: (info: DecoratorInfo) => boolean,
    ): DecoratorInfo[] | undefined {
        if (!allowedKinds.includes(node.getKind())) {
            // the specified node does not allowed to have decorators
            return undefined;
        }

        let decorators = node.getDecorators().map(x => {
            const di = {
                isDecoratorFactory: x.isDecoratorFactory(),
                name: x.getName(),
                text: x.getText(),
                parameters:
                    x.getArguments().length === 0
                        ? undefined
                        : x.getArguments().map(x => {
                              return {
                                  value: x.getText(),
                                  type: new TypeExtractor().extract(x.getType().getText()),
                              };
                          }),
            };

            return di;
        });

        if (filterStrategy) {
            decorators = decorators.filter(filterStrategy);
        }

        if (decorators.length === 0) return undefined;

        return decorators;
    }
}
