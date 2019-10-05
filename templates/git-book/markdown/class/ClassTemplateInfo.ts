export interface ClassTemplateInfo {
    name: string | undefined;
    text: string;
    modifiers: string[] | undefined;
    extends: string | undefined;
    implements: string[] | undefined;
    description: string[] | undefined;
    decorators: string | undefined;
    modules: string[] | undefined;
    typeParameters: string[] | undefined;
    properties: string[] | undefined;
    getAccessors: string[] | undefined;
    setAccessors: string[] | undefined;
    methods: string[] | undefined;
}
