import { ClassDeclaration, ConstructorDeclaration } from 'ts-morph';
import { ConstructorParameterInfo } from './ConstructorParameterInfo';
import { ConstructorInfo } from './ConstructorInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { DecoratorExtractor } from '../decorator/DecoratorExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';
import { TypeScope } from '../common/TypeScope';

export class ConstructorExtractor {
    public extract(node: ConstructorDeclaration, imports: ImportInfo[] | undefined): ConstructorInfo {
        const isImplementation = node.isImplementation();
        const isOverload = node.isOverload();
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const modifiers = node.getModifiers().length === 0 ? void 0 : node.getModifiers().map(x => x.getText());
        const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
        const params: ConstructorParameterInfo[] = node.getParameters().map(x => {
            return {
                name: x.getName(),
                type: new TypeExtractor().extract(
                    x.getType(),
                    TypeScope.Constructors,
                    x.getTypeNode(),
                    void 0,
                    imports,
                ),
                modifiers: x.getModifiers().length === 0 ? void 0 : x.getModifiers().map(y => y.getText()),
                isOptional: x.isOptional(),
                isRest: x.isRestParameter(),
                isParameterProperty: x.isParameterProperty(),
                initializer: x.getInitializer() === void 0 ? void 0 : x.getInitializerOrThrow().getText(),
                decorators: new DecoratorExtractor().extract(x, imports),
                text: x.getText(),
            };
        });
        return {
            id: getSha256(node.getFullText() + pathInfo.path),
            trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
            leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
            modifiers: modifiers,
            isParameterLess: params.length === 0,
            isImplementation: isImplementation,
            isOverload: isOverload,
            parameters: params.length === 0 ? void 0 : params,
            text: node.getText(),
            hasComment: hasComment,
            path: pathInfo.path,
            directory: pathInfo.directory,
            file: pathInfo.file,
            extension: pathInfo.extension,
        };
    }

    public extractFromClass(node: ClassDeclaration, imports: ImportInfo[] | undefined): ConstructorInfo[] | undefined {
        const result: ConstructorInfo[] = [];
        const ctors = node.getConstructors();
        if (ctors.length === 0) return void 0;
        ctors.forEach(ctor => {
            result.push(this.extract(ctor, imports));
        });
        return result;
    }
}
