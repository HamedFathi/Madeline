export const CALL_SIGNATURE_PARAMETER_TEMPLATE = `
{% if name|is_available %}
    **Name:** {{name|print('-','','')}}

{% endif %}

**Type:** {{type|print('-','','')}}

**Attributes:** {{isOptional|print_boolean}} Generator{{isRest|print_boolean|whitespace(5)}} Rest{{isParameterProperty|print_boolean|whitespace(5)}} Parameter Property

{% if modifiers|is_available %}
    **Modifier(s):** 

    {{modifiers|print_modifiers}}

{% endif %}

{% if initializer|is_available %}
    **Initializer:** 

    {{initializer|print('-','','')}}

{% endif %}

`;
