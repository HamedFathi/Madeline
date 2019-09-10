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
    public extract(node: VariableStatement): LiteralInfo[] | undefined {
        const result: LiteralInfo[] = [];
        node.getDeclarations().forEach(declaration => {
            const hasTypeReference = declaration.getInitializerIfKind(SyntaxKind.AsExpression) !== undefined;
            let typeReference: string | undefined = undefined;
            let objectLiteral: ObjectLiteralExpression | undefined = undefined;
            let arrayLiteral: ArrayLiteralExpression | undefined = undefined;
            if (hasTypeReference) {
                const asExpression = declaration.getInitializerIfKindOrThrow(SyntaxKind.AsExpression);
                const typeRef = asExpression.getLastChildIfKind(SyntaxKind.TypeReference);
                typeReference = typeRef === undefined ? undefined : typeRef.getText();
                objectLiteral = asExpression.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)[0];
                arrayLiteral = asExpression.getDescendantsOfKind(SyntaxKind.ArrayLiteralExpression)[0];
            } else {
                objectLiteral = declaration.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
                arrayLiteral = declaration.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
            }

            if (objectLiteral) {
                const elements = this.getExpressionInfo(objectLiteral);
                result.push({
                    elements: [elements as LiteralExpressionInfo],
                    isArrayLiteral: false,
                    text: node.getText(),
                    typeReference: typeReference,
                    name: declaration.getName(),
                    type: new TypeExtractor().extract(declaration.getType()),
                });
            }
            if (arrayLiteral) {
                const elements = arrayLiteral.getElements();
                const members: LiteralExpressionInfo[] = [];
                elements.forEach(element => {
                    const info = this.getExpressionInfo(element);
                    members.push(info as LiteralExpressionInfo);
                });
                result.push({
                    elements: members,
                    isArrayLiteral: true,
                    text: node.getText(),
                    typeReference: typeReference,
                    name: declaration.getName(),
                    type: new TypeExtractor().extract(declaration.getType()),
                });
            }
        });

        return result.length === 0 ? undefined : result;
    }

    private getExpressionInfo(node: Expression): LiteralExpressionInfo | FunctionInfo | CallSignatureInfo | string {
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
                        propertyAssignment.getInitializer() === undefined
                            ? undefined
                            : this.getExpressionInfo(propertyAssignment.getInitializerOrThrow());
                    const type = new TypeExtractor().extract(propertyAssignment.getType());
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
                    const type = new TypeExtractor().extract(shorthandPropertyAssignment.getType());
                    const name = shorthandPropertyAssignment.getName();
                    assignments.push({
                        isShorthand: true,
                        isSpread: false,
                        name: name,
                        type: type,
                        value: undefined,
                    });
                }
                if (isSpreadAssignment) {
                    const spreadAssignment = x as SpreadAssignment;
                    const type = new TypeExtractor().extract(spreadAssignment.getType());
                    const name = spreadAssignment.getExpression().getText();
                    assignments.push({
                        isShorthand: false,
                        isSpread: true,
                        name: name,
                        type: type,
                        value: undefined,
                    });
                }
                if (isGetAccessorDeclaration) {
                    const getAccessorDeclaration = x as GetAccessorDeclaration;
                    const getAccessorDeclarationInfo = new GetAccessorExtractor().extract(getAccessorDeclaration);
                    getAccessors.push(getAccessorDeclarationInfo);
                }
                if (isSetAccessorDeclaration) {
                    const setAccessorDeclaration = x as SetAccessorDeclaration;
                    const setAccessorDeclarationInfo = new SetAccessorExtractor().extract(setAccessorDeclaration);
                    setAccessors.push(setAccessorDeclarationInfo);
                }
                if (isMethodDeclaration) {
                    const methodDeclaration = x as MethodDeclaration;
                    const methodDeclarationInfo = new MethodExtractor().extract(methodDeclaration);
                    methods.push(methodDeclarationInfo);
                }
            });
            return {
                assignments: assignments,
                getAccessors: getAccessors,
                setAccessors: setAccessors,
                methods: methods,
                text: text,
                isObjectLiteral: true,
            };
        } else if (TypeGuards.isFunctionExpression(node)) {
            const functionExpression = node as FunctionExpression;
            const functionDeclarationInfo = new FunctionExtractor().extractFromExpression(functionExpression);
            return functionDeclarationInfo;
        } else if (TypeGuards.isArrowFunction(node)) {
            const arrowFunction = node as ArrowFunction;
            const callSignature = (arrowFunction as unknown) as CallSignatureDeclaration;
            return {
                returnType: new TypeExtractor().extract(callSignature.getReturnType()),
                typeParameters: new TypeParameterExtractor().extract(callSignature),
                parameters:
                    callSignature.getParameters().length === 0
                        ? undefined
                        : callSignature.getParameters().map(y => {
                              return {
                                  name: y.getName(),
                                  type: new TypeExtractor().extract(y.getType()),
                                  modifiers:
                                      y.getModifiers().length === 0
                                          ? undefined
                                          : y.getModifiers().map(x => x.getText()),
                                  isOptional: y.isOptional(),
                                  isRest: y.isRestParameter(),
                                  isParameterProperty: y.isParameterProperty(),
                                  initializer:
                                      y.getInitializer() === undefined
                                          ? undefined
                                          : y.getInitializerOrThrow().getText(),
                              };
                          }),
            };
        } else
            return {
                assignments: undefined,
                getAccessors: undefined,
                setAccessors: undefined,
                methods: undefined,
                text: node.getText(),
                isObjectLiteral: false,
            };
    }
}
