import { SyntaxKind } from 'ts-morph';
import { DecoratorInfo } from './DecoratorInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { DecoratableType } from './DecoratableType';
import { ImportInfo } from '../import/ImportInfo';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';
import { TypeCategory } from '../common/TypeCategory';

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
        node: DecoratableType,
        imports: ImportInfo[] | undefined,
        filterStrategy?: (info: DecoratorInfo) => boolean,
    ): DecoratorInfo[] | undefined {
        if (!allowedKinds.includes(node.getKind())) {
            // the specified node does not allowed to have decorators
            return void 0;
        }
        const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
        let decorators = node.getDecorators().map(x => {
            return {
                id: getSha256(node.getFullText() + pathInfo.path),
                isDecoratorFactory: x.isDecoratorFactory(),
                name: x.getName(),
                text: x.getText(),
                path: pathInfo.path,
                directory: pathInfo.directory,
                file: pathInfo.file,
                extension: pathInfo.extension,
                typeCategory: TypeCategory.Decorators,
                parameters:
                    x.getArguments().length === 0
                        ? void 0
                        : x.getArguments().map(x => {
                              return {
                                  value: x.getText(),
                                  type: new TypeExtractor().extract(x.getType(), void 0, void 0, imports),
                              };
                          }),
            };
        });

        if (filterStrategy) {
            decorators = decorators.filter(filterStrategy);
        }

        if (decorators.length === 0) return void 0;

        return decorators;
    }
}
