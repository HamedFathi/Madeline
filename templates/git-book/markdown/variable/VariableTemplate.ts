export const VARIABLE_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:** {{name|print('-','','')}}

**Kind:** ✔ {{kindName}}

**Type:** {{type|print('-','','')}}

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

{% if modules|is_available %}
    **Module(s):**{{modules|print('','','','\n\n')}}

{% endif %}

`;
