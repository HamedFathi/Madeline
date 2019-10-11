export const MODULE_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:**      

{{name|print('-','','')}}

**Type:**      

{{type|print('-','','')}}

{% if modifiers.length > 1 %}
    **Modifier(s):** 

    {{modifiers|print_modifiers}}

{% endif %}

`;
