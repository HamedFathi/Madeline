export interface DestructuringTemplateInfo {
    isArrayDestructuring: boolean;
    elements: string[] | undefined;
    initializer: string | undefined;
    modifiers: string[] | undefined;
    description: string[] | undefined;
    modules: string[] | undefined;
    kindName: string;
    typeReference: string | undefined;
    text: string;
}
