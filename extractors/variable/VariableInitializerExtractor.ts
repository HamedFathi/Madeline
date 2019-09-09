import {
    Expression,
    TypeGuards,
    ObjectLiteralExpression,
    ArrayLiteralExpression,
    GetAccessorDeclaration,
    PropertyAssignment,
    ShorthandPropertyAssignment,
    SetAccessorDeclaration,
    MethodDeclaration,
    SpreadAssignment,
    FunctionExpression,
    ArrowFunction,
    CallSignatureDeclaration,
    AsExpression,
    SyntaxKind,
} from 'ts-morph';
import { GetAccessorExtractor } from '../get-accessor/GetAccessorExtractor';
import { TypeExtractor } from '../common/TypeExtractor';
import { SetAccessorExtractor } from '../set-accessor/SetAccessorExtractor';
import { MethodExtractor } from '../method/MethodExtractor';
import { VariableArrayLiteralInfo } from './VariableArrayLiteralInfo';
import { VariableObjectLiteralInfo } from './VariableObjectLiteralInfo';
import { AssignmentInfo } from './AssignmentInfo';
import { SetAccessorInfo } from '../set-accessor/SetAccessorInfo';
import { GetAccessorInfo } from '../get-accessor/GetAccessorInfo';
import { MethodInfo } from '../method/MethodInfo';
import { FunctionExtractor } from '../function/FunctionExtractor';
import { FunctionInfo } from '../function/FunctionInfo';
import { CallSignatureInfo } from './CallSignatureInfo';
import { TypeParameterExtractor } from '../type-parameter/TypeParameterExtractor';

export class VariableInitializerExtractor {
    public extract(
        node: Expression,
    ): VariableObjectLiteralInfo | VariableArrayLiteralInfo | FunctionInfo | CallSignatureInfo | string {
        if (TypeGuards.isAsExpression(node)) {
            const obj = node as AsExpression;
            const types = obj.getDescendantsOfKind(SyntaxKind.TypeReference);
            if (types.length > 0) {
                const refType = types[types.length - 1];
                return refType.getText();
            }
        }
        if (TypeGuards.isObjectLiteralExpression(node)) {
            const obj = node as ObjectLiteralExpression;
            const assignments: AssignmentInfo[] = [];
            const getAccessors: GetAccessorInfo[] = [];
            const setAccessors: SetAccessorInfo[] = [];
            const methods: MethodInfo[] = [];
            obj.getProperties().map(x => {
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
                            : this.extract(propertyAssignment.getInitializerOrThrow());
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
                                defaultValue:
                                    y.getInitializer() === undefined
                                        ? undefined
                                        : y.getInitializerOrThrow().getText(),
                            };
                        }),
            };
        } else if (TypeGuards.isArrayLiteralExpression(node)) {
            const obj = node as ArrayLiteralExpression;
            const elements = obj.getElements().map(f => {
                return {
                    name: f.getText(),
                    type: new TypeExtractor().extract(f.getType()),
                };
            });
            return {
                elements: elements,
            };
        } else {
            return node.getText();
        }
    }
}
