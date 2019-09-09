import { Type, PropertyDeclaration, ParameterDeclaration } from 'ts-morph';
import { TypeInfo } from './TypeInfo';
import { TypeKind } from './TypeKind';
import { JsonLikeTypeInfo } from './JsonLikeTypeInfo';
import { CallSignatureTypeInfo } from './CallSignatureTypeInfo';
import { JsonUtils } from '../../utilities/JsonUtils';
import { ImportInType } from './ImportInType';

export class TypeExtractor {
    private readonly jsonUtils = new JsonUtils();
    public extract(node: Type): TypeInfo {
        const typeInfo: TypeInfo = {
            kind: TypeKind.NotSpecified,
            kindName: TypeKind[TypeKind.NotSpecified],
            type: node.getText(),
        };
        try {
            const callSignatures = node.getCallSignatures();
            if (callSignatures.length > 0) {
                typeInfo.kind = TypeKind.CallSignature;
                const result: CallSignatureTypeInfo[] = [];
                callSignatures.forEach(signature => {
                    const returnType = new TypeExtractor().extract(signature.getReturnType());
                    const name = signature
                        .getDeclaration()
                        .getType()
                        .getText();
                    const params = signature.getParameters().map(x => {
                        return {
                            name: x.getName(),
                            type:
                                x.getValueDeclaration() === undefined
                                    ? undefined
                                    : new TypeExtractor().extract(x.getValueDeclarationOrThrow().getType()),
                            isOptional:
                                x.getValueDeclaration() === undefined
                                    ? false
                                    : (x.getValueDeclarationOrThrow() as ParameterDeclaration).isOptional(),
                        };
                    });
                    result.push({ name: name, returnType: returnType, parameters: params });
                });
                typeInfo.kind = TypeKind.CallSignature;
                typeInfo.kindName = TypeKind[TypeKind.CallSignature];
                typeInfo.type = result;
                return typeInfo;
            }
            if (node.getText() === 'void') {
                typeInfo.kind = TypeKind.Void;
                typeInfo.kindName = TypeKind[TypeKind.Void];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.getText() === 'never') {
                typeInfo.kind = TypeKind.Never;
                typeInfo.kindName = TypeKind[TypeKind.Never];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.getText() === 'unknown') {
                typeInfo.kind = TypeKind.Unknown;
                typeInfo.kindName = TypeKind[TypeKind.Unknown];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.getText() === 'undefined') {
                typeInfo.kind = TypeKind.Undefined;
                typeInfo.kindName = TypeKind[TypeKind.Undefined];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.getText() === 'null') {
                typeInfo.kind = TypeKind.Null;
                typeInfo.kindName = TypeKind[TypeKind.Null];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.getText() === 'object') {
                typeInfo.kind = TypeKind.Object;
                typeInfo.kindName = TypeKind[TypeKind.Object];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.getText() === 'bigint') {
                typeInfo.kind = TypeKind.BigInt;
                typeInfo.kindName = TypeKind[TypeKind.BigInt];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.getText() === 'symbol' || node.getText() === 'Symbol') {
                typeInfo.kind = TypeKind.Symbol;
                typeInfo.kindName = TypeKind[TypeKind.Symbol];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.getText().indexOf('Promise') != -1) {
                typeInfo.kind = TypeKind.Promise;
                typeInfo.kindName = TypeKind[TypeKind.Promise];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.isNumber() || node.compilerType.isNumberLiteral()) {
                typeInfo.kind = TypeKind.Number;
                typeInfo.kindName = TypeKind[TypeKind.Number];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.isString() || node.compilerType.isStringLiteral()) {
                typeInfo.kind = TypeKind.String;
                typeInfo.kindName = TypeKind[TypeKind.String];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.isBoolean() || node.getText() === 'true' || node.getText() === 'false') {
                typeInfo.kind = TypeKind.Boolean;
                typeInfo.kindName = TypeKind[TypeKind.Boolean];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.isAny()) {
                typeInfo.kind = TypeKind.Any;
                typeInfo.kindName = TypeKind[TypeKind.Any];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.isArray()) {
                typeInfo.kind = TypeKind.Array;
                typeInfo.kindName = TypeKind[TypeKind.Array];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.isClass()) {
                typeInfo.kind = TypeKind.Class;
                typeInfo.kindName = TypeKind[TypeKind.Class];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.isInterface()) {
                typeInfo.kind = TypeKind.Interface;
                typeInfo.kindName = TypeKind[TypeKind.Interface];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.isEnum()) {
                typeInfo.kind = TypeKind.Enum;
                typeInfo.kindName = TypeKind[TypeKind.Enum];
                typeInfo.type = node.getText();
                return typeInfo;
            }
            if (node.isTuple()) {
                typeInfo.kind = TypeKind.Tuple;
                typeInfo.kindName = TypeKind[TypeKind.Tuple];
                typeInfo.type = node.getTupleElements().map(x => x.getText());
                return typeInfo;
            }
            if (node.isUnion()) {
                typeInfo.kind = TypeKind.Union;
                typeInfo.kindName = TypeKind[TypeKind.Union];
                typeInfo.type = node.getUnionTypes().map(x => x.getText());
                return typeInfo;
            }
            if (node.isIntersection()) {
                typeInfo.kind = TypeKind.Intersection;
                typeInfo.kindName = TypeKind[TypeKind.Intersection];
                typeInfo.type = node.getIntersectionTypes().map(x => x.getText());
                return typeInfo;
            }
            if (this.jsonUtils.isJsonLike(node.getText())) {
                typeInfo.kind = TypeKind.JsonLike;
                typeInfo.kindName = TypeKind[TypeKind.JsonLike];
                const jsonLike: JsonLikeTypeInfo[] = node.getProperties().map(x => {
                    return {
                        name: x.getName(),
                        value:
                            x.getValueDeclaration() === undefined
                                ? undefined
                                : (x.getValueDeclarationOrThrow() as PropertyDeclaration).getInitializer() === undefined
                                    ? (x.getValueDeclarationOrThrow() as PropertyDeclaration).getType().getText()
                                    : (x.getValueDeclarationOrThrow() as PropertyDeclaration)
                                        .getInitializerOrThrow()
                                        .getText(),
                    };
                });
                typeInfo.type = jsonLike;
                return typeInfo;
            }
            if (node.isAnonymous()) {
                typeInfo.kind = TypeKind.Anonymous;
                typeInfo.kindName = TypeKind[TypeKind.Anonymous];
                typeInfo.type = node.getText();
                return typeInfo;
            }
        } catch (e) { }
        return typeInfo;
    }

    public detectImportInType(text: string): ImportInType | undefined {
        const regex = /import\(.+\)./;
        if (regex.test(text)) {
            const name = text.replace(regex, '');
            // @ts-ignore
            const imported = text
                .match(regex)[0]
                .replace('import("', '')
                .replace('").', '');
            return {
                name: name.trim(),
                importedFrom: imported.trim(),
                isDefault: false
            };
        } else {
            return undefined;
        }
    }
}

