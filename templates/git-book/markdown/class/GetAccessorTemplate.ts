export const GET_ACCESSOR_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:**      

{{name|print('-','','')}}

**ReturnType:**      

{{returnType|print('-','','')}}

{% if modifiers|is_available %}
    **Modifier(s):** 

    {{modifiers|print_modifiers}}

{% endif %}

{% if decorators|is_available %}
    **Decorator(s):** 

    {{decorators|print('-','','')}}

{% endif %}

{% if typeParameters|is_available %}
    **Type Parameter(s):** 

    {{typeParameters|print('','\`\`\`','\`\`\`','\n\n')}}

{% endif %}

`;
