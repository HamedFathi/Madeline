export interface InterfaceTemplateInfo {
    name: string | undefined;
    modifiers: string[] | undefined;
    description: string[] | undefined;
    typeParameters: string[] | undefined;
    modules: string[] | undefined;
    text: string;
    extends: string[] | undefined;
    constructors: string[] | undefined;
    properties: string[] | undefined;
    methods: string[] | undefined;
    callSignatures: string[] | undefined;
    indexers: string[] | undefined;
}
