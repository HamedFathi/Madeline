export interface FunctionParameterTemplateInfo {
    name: string;
    modifiers: string[] | undefined;
    type: string;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    initializer: string | undefined;
    text: string;
}
