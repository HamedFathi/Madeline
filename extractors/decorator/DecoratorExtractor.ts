import {
    ClassDeclaration,
    MethodDeclaration,
    PropertyDeclaration,
    GetAccessorDeclaration,
    ParameterDeclaration,
    SetAccessorDeclaration,
} from 'ts-morph';
import { DecoratorInfo } from './DecoratorInfo';
import { TypeExtractor } from '../common/TypeExtractor';

export class DecoratorExtractor {
    public extract(
        node:
            | ClassDeclaration
            | MethodDeclaration
            | PropertyDeclaration
            | GetAccessorDeclaration
            | SetAccessorDeclaration
            | ParameterDeclaration,
    ): DecoratorInfo[] | undefined {
        const decorators = node.getDecorators().map(x => {
            return {
                isDecoratorFactory: x.isDecoratorFactory(),
                name: x.getName(),
                parameters:
                    x.getArguments().length === 0
                        ? undefined
                        : x.getArguments().map(x => new TypeExtractor().extract(x.getType())),
            };
        });
        if (decorators.length === 0) return undefined;
        return decorators;
    }
}
