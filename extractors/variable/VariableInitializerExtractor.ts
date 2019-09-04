import { Expression, TypeGuards, ObjectLiteralExpression, ArrayLiteralExpression, GetAccessorDeclaration, PropertyAssignment, ShorthandPropertyAssignment, SetAccessorDeclaration, MethodDeclaration, SpreadAssignment, FunctionDeclaration, FunctionExpression, ArrowFunction, CallSignatureDeclaration } from 'ts-morph';
import { GetAccessorExtractor } from '../get-accessor/GetAccessorExtractor';
import { TypeExtractor } from '../common/TypeExtractor';
import { SetAccessorExtractor } from '../set-accessor/SetAccessorExtractor';
import { MethodExtractor } from '../method/MethodExtractor';
import { VariableArrayLiteralInfo } from './VariableInitializerInfo';
import { VariableObjectLiteralInfo } from "./VariableObjectLiteralInfo";
import { AssignmentInfo } from './AssignmentInfo';
import { SetAccessorInfo } from '../set-accessor/SetAccessorInfo';
import { GetAccessorInfo } from '../get-accessor/GetAccessorInfo';
import { MethodInfo } from '../method/MethodInfo';
import { FunctionExtractor } from '../function/FunctionExtractor';
import { FunctionInfo } from '../function/FunctionInfo';
import { CallSignatureInfo } from './CallSignatureInfo';

export class VariableInitializerExtractor {
    public extract(node: Expression): VariableObjectLiteralInfo | VariableArrayLiteralInfo | FunctionInfo | CallSignatureInfo | string {
        if (TypeGuards.isObjectLiteralExpression(node)) {
            const obj = node as ObjectLiteralExpression;
            let assignments: AssignmentInfo[] = [];
            let getAccessors: GetAccessorInfo[] = [];
            let setAccessors: SetAccessorInfo[] = [];
            let methods: MethodInfo[] = [];
            obj.getProperties().map(x => {
                let isPropertyAssignment = TypeGuards.isPropertyAssignment(x);
                let isShorthandPropertyAssignment = TypeGuards.isShorthandPropertyAssignment(x);
                let isSpreadAssignment = TypeGuards.isSpreadAssignment(x);
                let isGetAccessorDeclaration = TypeGuards.isGetAccessorDeclaration(x);
                let isSetAccessorDeclaration = TypeGuards.isSetAccessorDeclaration(x);
                let isMethodDeclaration = TypeGuards.isMethodDeclaration(x);

                if (isPropertyAssignment) {
                    let propertyAssignment = x as PropertyAssignment;
                    let type = propertyAssignment.getInitializer() === undefined ? undefined : this.extract(propertyAssignment.getInitializerOrThrow())
                    let name = propertyAssignment.getName();
                    assignments.push({
                        isShorthand: false,
                        isSpread: false,
                        name: name,
                        type: type
                    });
                }
                if (isShorthandPropertyAssignment) {
                    let shorthandPropertyAssignment = x as ShorthandPropertyAssignment;
                    let type = new TypeExtractor().extract(shorthandPropertyAssignment.getType());
                    let name = shorthandPropertyAssignment.getName();
                    assignments.push({
                        isShorthand: true,
                        isSpread: false,
                        name: name,
                        type: type
                    });
                }
                if (isSpreadAssignment) {
                    let spreadAssignment = x as SpreadAssignment;
                    let type = new TypeExtractor().extract(spreadAssignment.getType());
                    let name = spreadAssignment.getExpression().getText()
                    assignments.push({
                        isShorthand: false,
                        isSpread: true,
                        name: name,
                        type: type
                    });
                }
                if (isGetAccessorDeclaration) {
                    let getAccessorDeclaration = x as GetAccessorDeclaration;
                    let getAccessorDeclarationInfo = new GetAccessorExtractor().extract(getAccessorDeclaration);
                    getAccessors.push(getAccessorDeclarationInfo);
                }
                if (isSetAccessorDeclaration) {
                    let setAccessorDeclaration = x as SetAccessorDeclaration;
                    let setAccessorDeclarationInfo = new SetAccessorExtractor().extract(setAccessorDeclaration);
                    setAccessors.push(setAccessorDeclarationInfo);
                }
                if (isMethodDeclaration) {
                    let methodDeclaration = x as MethodDeclaration;
                    let methodDeclarationInfo = new MethodExtractor().extract(methodDeclaration);
                    methods.push(methodDeclarationInfo);
                }
            });
            return {
                assignments: assignments,
                getAccessors: getAccessors,
                setAccessors: setAccessors,
                methods: methods
            }
        }
        else if (TypeGuards.isFunctionExpression(node)) {
            let functionExpression = node as FunctionExpression;
            let functionDeclarationInfo = new FunctionExtractor().extractFromExpression(functionExpression);
            return functionDeclarationInfo;
        }
        else if (TypeGuards.isArrowFunction(node)) {
            let arrowFunction = node as ArrowFunction;
            let callSignature = arrowFunction as unknown as CallSignatureDeclaration;
            return {
                returnType: new TypeExtractor().extract(callSignature.getReturnType()),
                typeParameters: callSignature.getTypeParameters().map(y => {
                    return {
                        name: y.getName(),
                        constraint: y.getConstraint() === undefined
                            ? undefined
                            : y.getConstraintOrThrow().getType().getText()
                    }
                }),
                parameters: callSignature.getParameters().length === 0 ? undefined : callSignature.getParameters().map(y => {
                    return {
                        name: y.getName(),
                        type: new TypeExtractor().extract(y.getType()),
                        modifiers: y.getModifiers().length === 0 ? undefined : y.getModifiers().map(x => x.getText()),
                        isOptional: y.isOptional(),
                        isRest: y.isRestParameter(),
                        isParameterProperty: y.isParameterProperty(),
                        defaultValue: y.getInitializer() === undefined ? undefined : y.getInitializerOrThrow().getText()
                    }
                })
            }
        }
        else if (TypeGuards.isArrayLiteralExpression(node)) {
            const obj = node as ArrayLiteralExpression;
            var elements = obj.getElements().map(f => {
                return {
                    name: f.getText(),
                    type: new TypeExtractor().extract(f.getType())
                }
            });
            return {
                elements: elements
            }
        }
        else {
            let text = node.getText();
            return text;
        }
    }
}