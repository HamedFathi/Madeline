import { ClassDeclaration, MethodDeclaration, PropertyDeclaration, GetAccessorDeclaration, ParameterDeclaration } from 'ts-morph';
import { DecoratorInfo } from './DecoratorInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { StringUtils } from '../../utilities/StringUtils';

export class DecoratorExtractor {
    public extract(node: ClassDeclaration | MethodDeclaration | PropertyDeclaration | GetAccessorDeclaration | ParameterDeclaration): DecoratorInfo[] | undefined {
        let decorators = node
            .getDecorators()
            .map(x => {
                return {
                    isDecoratorFactory: x.isDecoratorFactory(),
                    name: x.getName(),
                    parameters: x.getArguments().length === 0 ? undefined : x.getArguments().map(x => new TypeExtractor().extract(x.getType()))
                }
            });
        if (decorators.length === 0) return undefined;
        return decorators;
    }
}

