export interface CallSignatureParameterTemplateInfo
{
    name: string | undefined;
    type: string;
    isOptional: boolean;
    isRest: boolean;
    isParameterProperty: boolean;
    modifiers: string[] | undefined;
    initializer: string | undefined;
}