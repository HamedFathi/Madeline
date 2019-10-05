export const TYPE_ALIAS_TEMPLATE = `
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

**Initializer:** 

{{initializer|print('-','','')}}

{% if typeParameters|is_available %}
    **Type Parameter(s):** 

    {{typeParameters|print('','\`\`\`','\`\`\`','\n\n')}}

{% endif %}

{% if modules|is_available %}
    **Module(s):** 

    {{modules|print('','','','\n\n')}}

{% endif %}

`;
