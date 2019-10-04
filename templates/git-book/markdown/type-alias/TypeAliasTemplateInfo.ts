export interface TypeAliasTemplateInfo {
    name: string;
    text: string;
    modifiers: string[] | undefined;
    initializer: string;
    description: string[] | undefined;
    modules: string[] | undefined;
    type: string;
    typeParameters: string[] | undefined;
    hasComment: boolean;
}
