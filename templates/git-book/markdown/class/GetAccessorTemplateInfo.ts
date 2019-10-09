export interface GetAccessorTemplateInfo {
    name: string;
    returnType: string;
    modifiers: string[] | undefined;
    description: string[] | undefined;
    decorators: string | undefined;
    text: string;
    typeParameters: string[] | undefined;
}
