export interface LiteralExpressionTemplateInfo {
    assignments: string[] | undefined;
    getAccessors: string[] | undefined;
    setAccessors: string[] | undefined;
    methods: string[] | undefined;
    text: string;
    isObjectLiteral: boolean;
}
