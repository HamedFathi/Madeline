export interface LiteralTemplateInfo {
    typeReference: string | undefined;
    text: string;
    isArrayLiteral: boolean;
    elements: string[] | undefined;
    name: string;
    type: string;
    description: string[] | undefined;
    hasComment: boolean;
}
