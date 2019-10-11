export const INTERFACE_PROPERTY_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

{% if name|is_available %}
    **Name:** {{name|print('-','','','')}}

{% endif %}

**Type:** {{type|print('-','','')}}

**Attributes:** {{isOptional|print_boolean}} Optional

`;
