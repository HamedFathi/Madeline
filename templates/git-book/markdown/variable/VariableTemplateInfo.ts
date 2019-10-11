export interface VariableTemplateInfo {
    name: string;
    type: string;
    text: string;
    modifiers: string[] | undefined;
    description: string[] | undefined;
    modules: string[] | undefined;
    initializer: string | undefined;
    kindName: string;
    typeReference: string | undefined;
}
