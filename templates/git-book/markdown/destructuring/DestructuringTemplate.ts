export const DESTRUCTURING_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Attributes:** {{isArrayDestructuring|print_boolean}} Array{{isArrayDestructuring|print_boolean}} Array

{% if typeReference|is_available %}
    **Type Reference:** 

    {{typeReference|print('','','','')}}

{% endif %}

{% if initializer|is_available %}
    **Initializer:** 

    {{initializer|print('','','','')}}

{% endif %}

{% if modifiers.length > 1 %}
    **Modifier(s):** {{modifiers|print_modifiers}}

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
