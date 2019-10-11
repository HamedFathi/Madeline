export interface PropertyTemplateInfo {
    name: string;
    type: string;
    modifiers: string[] | undefined;
    isOptional: boolean;
    initializer: string | undefined;
    description: string[] | undefined;
    decorators: string | undefined;
    text: string;
}
