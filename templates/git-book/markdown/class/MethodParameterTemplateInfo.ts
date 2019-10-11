export interface MethodParameterTemplateInfo {
    name: string;
    type: string;
    text: string;
    modifiers: string[] | undefined;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    initializer: string | undefined;
    decorators: string | undefined;
}
