export const INTERFACE_PARAMETER_TEMPLATE = `
{% if name|is_available %}
    **Name:** {{name|print('-','','')}}

{% endif %}

{% if type|is_available %}
    **Type:** {{type|print('-','','')}}

{% endif %}

{% if modifiers|is_available %}
    **Modifiers:** {{modifiers|print('-','','')}}

{% endif %}

**Attributes:** {{isOptional|print_boolean}} Optional{{isRest|print_boolean}} Rest{{isParameterProperty|print_boolean}} Parameter Property

{% if initializer|is_available %}
    **Initializer:** {{initializer|print('-','','')}}

{% endif %}

`;
