import {
    VariableStatement,
    SyntaxKind,
    ObjectLiteralExpression,
    ArrayLiteralExpression,
    TypeGuards,
    PropertyAssignment,
    ShorthandPropertyAssignment,
    SpreadAssignment,
    GetAccessorDeclaration,
    SetAccessorDeclaration,
    MethodDeclaration,
    Expression,
    ArrowFunction,
    FunctionExpression,
    CallSignatureDeclaration,
} from 'ts-morph';
import { GetAccessorInfo } from '../get-accessor/GetAccessorInfo';
import { SetAccessorInfo } from '../set-accessor/SetAccessorInfo';
import { MethodInfo } from '../method/MethodInfo';
import { TypeExtractor } from '../common/TypeExtractor';
import { MethodExtractor } from '../method/MethodExtractor';
import { SetAccessorExtractor } from '../set-accessor/SetAccessorExtractor';
import { GetAccessorExtractor } from '../get-accessor/GetAccessorExtractor';
import { FunctionExtractor } from '../function/FunctionExtractor';
import { CallSignatureInfo } from '../common/CallSignatureInfo';
import { FunctionInfo } from '../function/FunctionInfo';
import { LiteralAssignmentInfo } from './LiteralAssignmentInfo';
import { LiteralInfo } from './LiteralInfo';
import { LiteralExpressionInfo } from './LiteralExpressionInfo';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { ImportInfo } from '../import/ImportInfo';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';
/*
const obj = {
    propertyAssignment2: function(x: number) {},
  propertyAssignment: 5,
  propertyAssignment3: (x: number) => {
    return true;
  },
  propertyAssignment4: {
    propertyAssignment: 5,
    propertyAssignment2: function(x: number) {},
    propertyAssignment3: (x: number) => {
      return true;
    },
    shorthandPropertyAssignment,
    ...spreadAssignment,
    get getAccessor() {
      return 5;
    },
    set setAccessor(value: number) {
      // do something
    },
    method() {
      return "some string";
    }
  },
  shorthandPropertyAssignment,
  ...spreadAssignment,
  get getAccessor() {
    return 5;
  },
  set setAccessor(value: number) {
    // do something
  },
  method() {
    return "some string";
  }
};
  
const obj = {
    propertyAssignment: 5,
    propertyAssignment: function(x:number) {},

    shorthandPropertyAssignment,
    ...spreadAssignment,
    get getAccessor() {
        return 5;
    },
    set setAccessor(value: number) {
        // do something
    },
    method() {
        return "some string"
    }
};

let a = {x:1} as unknown as any as y;

let a = [{x:1},{x:1}] as y;

export const a = [{
    a:1
}]

export const BasicConfiguration = {
  register(container: IContainer): IContainer {
    return RuntimeBasicConfiguration
      .register(container)
      .register(
        ...DefaultComponents,
        ...DefaultBindingSyntax,
        ...DefaultBindingLanguage
      );
  },
  createContainer(): IContainer {
    return this.register(DI.createContainer());
  }
};
*/
export class LiteralExtractor {
    public extract(node: VariableStatement, imports: ImportInfo[] | undefined): LiteralInfo[] | undefined {
        const result: LiteralInfo[] = [];
        const trailingComments = new TypescriptCommentExtractor().extract(node.getTrailingCommentRanges());
        const leadingComments = new TypescriptCommentExtractor().extract(node.getLeadingCommentRanges());
        const hasComment = trailingComments.length !== 0 || leadingComments.length !== 0;
        const pathInfo = getPathInfo(node.getSourceFile().getFilePath());
        const text = node.getFullText();
        node.getDeclarations().forEach(declaration => {
            const hasTypeReference = declaration.getInitializerIfKind(SyntaxKind.AsExpression) !== undefined;
            let typeReference: string | undefined = void 0;
            let objectLiteral: ObjectLiteralExpression | undefined = void 0;
            let arrayLiteral: ArrayLiteralExpression | undefined = void 0;
            if (hasTypeReference) {
                const asExpression = declaration.getInitializerIfKindOrThrow(SyntaxKind.AsExpression);
                const typeRef = asExpression.getLastChildIfKind(SyntaxKind.TypeReference);
                typeReference = typeRef === void 0 ? void 0 : typeRef.getText();
                objectLiteral = asExpression.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)[0];
                arrayLiteral = asExpression.getDescendantsOfKind(SyntaxKind.ArrayLiteralExpression)[0];
            } else {
                objectLiteral = declaration.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
                arrayLiteral = declaration.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
            }

            if (objectLiteral) {
                const elements = this.getExpressionInfo(objectLiteral, typeReference, imports);
                result.push({
                    id: getSha256(text + pathInfo.path),
                    elements: [elements as LiteralExpressionInfo],
                    isArrayLiteral: false,
                    text: text,
                    trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
                    leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
                    hasComment: hasComment,
                    path: pathInfo.path,
                    directory: pathInfo.directory,
                    file: pathInfo.file,
                    extension: pathInfo.extension,
                    typeReference: typeReference,
                    name: declaration.getName(),
                    type: new TypeExtractor().extract(
                        declaration.getType(),
                        declaration.getTypeNode(),
                        typeReference,
                        imports,
                    ),
                });
            }
            if (arrayLiteral) {
                const elements = arrayLiteral.getElements();
                const members: LiteralExpressionInfo[] = [];
                elements.forEach(element => {
                    const info = this.getExpressionInfo(element, typeReference, imports);
                    members.push(info as LiteralExpressionInfo);
                });
                result.push({
                    id: getSha256(text + pathInfo.path),
                    elements: members,
                    trailingComments: trailingComments.length === 0 ? void 0 : trailingComments,
                    leadingComments: leadingComments.length === 0 ? void 0 : leadingComments,
                    hasComment: hasComment,
                    path: pathInfo.path,
                    directory: pathInfo.directory,
                    file: pathInfo.file,
                    extension: pathInfo.extension,
                    isArrayLiteral: true,
                    text: text,
                    typeReference: typeReference,
                    name: declaration.getName(),
                    type: new TypeExtractor().extract(
                        declaration.getType(),
                        declaration.getTypeNode(),
                        void 0,
                        imports,
                    ),
                });
            }
        });

        return result.length === 0 ? void 0 : result;
    }

    private getExpressionInfo(
        node: Expression,
        typeReference: string | undefined,
        imports: ImportInfo[] | undefined,
    ): LiteralExpressionInfo | FunctionInfo | CallSignatureInfo | string {
        if (TypeGuards.isObjectLiteralExpression(node)) {
            const objectLiteral = node as ObjectLiteralExpression;
            const assignments: LiteralAssignmentInfo[] = [];
            const getAccessors: GetAccessorInfo[] = [];
            const setAccessors: SetAccessorInfo[] = [];
            const methods: MethodInfo[] = [];
            const text = objectLiteral.getText();
            objectLiteral.getProperties().map(x => {
                const isPropertyAssignment = TypeGuards.isPropertyAssignment(x);
                const isShorthandPropertyAssignment = TypeGuards.isShorthandPropertyAssignment(x);
                const isSpreadAssignment = TypeGuards.isSpreadAssignment(x);
                const isGetAccessorDeclaration = TypeGuards.isGetAccessorDeclaration(x);
                const isSetAccessorDeclaration = TypeGuards.isSetAccessorDeclaration(x);
                const isMethodDeclaration = TypeGuards.isMethodDeclaration(x);
                if (isPropertyAssignment) {
                    const propertyAssignment = x as PropertyAssignment;
                    const value =
                        propertyAssignment.getInitializer() === void 0
                            ? void 0
                            : this.getExpressionInfo(propertyAssignment.getInitializerOrThrow(), void 0, imports);
                    const type = new TypeExtractor().extract(
                        propertyAssignment.getType(),
                        void 0,
                        typeReference,
                        imports,
                    );
                    const name = propertyAssignment.getName();
                    assignments.push({
                        isShorthand: false,
                        isSpread: false,
                        name: name,
                        type: type,
                        value: value,
                    });
                }
                if (isShorthandPropertyAssignment) {
                    const shorthandPropertyAssignment = x as ShorthandPropertyAssignment;
                    const type = new TypeExtractor().extract(
                        shorthandPropertyAssignment.getType(),
                        void 0,
                        typeReference,
                        imports,
                    );
                    const name = shorthandPropertyAssignment.getName();
                    assignments.push({
                        isShorthand: true,
                        isSpread: false,
                        name: name,
                        type: type,
                        value: void 0,
                    });
                }
                if (isSpreadAssignment) {
                    const spreadAssignment = x as SpreadAssignment;
                    const type = new TypeExtractor().extract(
                        spreadAssignment.getType(),
                        void 0,
                        typeReference,
                        imports,
                    );
                    const name = spreadAssignment.getExpression().getText();
                    assignments.push({
                        isShorthand: false,
                        isSpread: true,
                        name: name,
                        type: type,
                        value: void 0,
                    });
                }
                if (isGetAccessorDeclaration) {
                    const getAccessorDeclaration = x as GetAccessorDeclaration;
                    const getAccessorDeclarationInfo = new GetAccessorExtractor().extract(
                        getAccessorDeclaration,
                        imports,
                    );
                    getAccessors.push(getAccessorDeclarationInfo);
                }
                if (isSetAccessorDeclaration) {
                    const setAccessorDeclaration = x as SetAccessorDeclaration;
                    const setAccessorDeclarationInfo = new SetAccessorExtractor().extract(
                        setAccessorDeclaration,
                        imports,
                    );
                    setAccessors.push(setAccessorDeclarationInfo);
                }
                if (isMethodDeclaration) {
                    const methodDeclaration = x as MethodDeclaration;
                    const methodDeclarationInfo = new MethodExtractor().extract(methodDeclaration, imports);
                    methods.push(methodDeclarationInfo);
                }
            });
            return {
                assignments: assignments.length === 0 ? void 0 : assignments,
                getAccessors: getAccessors.length === 0 ? void 0 : getAccessors,
                setAccessors: setAccessors.length === 0 ? void 0 : setAccessors,
                methods: methods.length === 0 ? void 0 : methods,
                text: text,
                isObjectLiteral: true,
            };
        } else if (TypeGuards.isFunctionExpression(node)) {
            const functionExpression = node as FunctionExpression;
            const functionDeclarationInfo = new FunctionExtractor().extractFromExpression(functionExpression, imports);
            return functionDeclarationInfo;
        } else if (TypeGuards.isArrowFunction(node)) {
            const arrowFunction = node as ArrowFunction;
            const callSignature = (arrowFunction as unknown) as CallSignatureDeclaration;
            return {
                returnType: new TypeExtractor().extract(
                    callSignature.getReturnType(),
                    callSignature.getReturnTypeNode(),
                    typeReference,
                    imports,
                ),
                typeParameters: new TypeParameterExtractor().extract(callSignature, imports),
                parameters:
                    callSignature.getParameters().length === 0
                        ? void 0
                        : callSignature.getParameters().map(y => {
                              return {
                                  name: y.getName(),
                                  type: new TypeExtractor().extract(
                                      y.getType(),
                                      y.getTypeNode(),
                                      typeReference,
                                      imports,
                                  ),
                                  modifiers:
                                      y.getModifiers().length === 0 ? void 0 : y.getModifiers().map(x => x.getText()),
                                  isOptional: y.isOptional(),
                                  isRest: y.isRestParameter(),
                                  isParameterProperty: y.isParameterProperty(),
                                  initializer:
                                      y.getInitializer() === void 0 ? void 0 : y.getInitializerOrThrow().getText(),
                              };
                          }),
            };
        } else
            return {
                assignments: void 0,
                getAccessors: void 0,
                setAccessors: void 0,
                methods: void 0,
                text: node.getText(),
                isObjectLiteral: false,
            };
    }
}
