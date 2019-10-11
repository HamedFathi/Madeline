export const LITERAL_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:** {{name|print('-','','')}}

**Type:** {{type|print('-','','')}}

**Attribute:** {{isArrayLiteral|print_boolean}} Array Literal

{% if typeReference|is_available %}
    **Type Reference:** 

    {{typeReference|print('','','','')}}

{% endif %}

{% if elements|is_available %}
    {{**Element(s):**}}
    {% for element in elements %}
        {{element|print('','','','\n')}}

    {% endfor %}
{% endif %}

{% if modules|is_available %}
    **Module(s):** {{modules|print('','','','\n\n')}}

{% endif %}

`;
