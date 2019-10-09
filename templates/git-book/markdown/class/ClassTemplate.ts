export const CLASS_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:** {{name|print('-','','')}}

{% if extends|is_available %}
    **Extends:** 

    {{extends|print('','','','')}}

{% endif %}

{% if implements|is_available %}
    **Implement(s):** 

    {{implements|print('','','',', ')}}

{% endif %}

{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

{% if modifiers.length > 1 %}
    **Modifier(s):** {{modifiers|print_modifiers}}

{% endif %}

{% if decorators|is_available %}
    **Decorator(s):** 

    {{decorators|print('-','','')}}

{% endif %}

{% if typeParameters|is_available %}
    **Type Parameter(s):** 

    {{typeParameters|print('','\`\`\`','\`\`\`','\n\n')}}

{% endif %}

{% if modules|is_available %}
    **Module(s):** {{modules|print('','','','\n\n')}}

{% endif %}

`;
