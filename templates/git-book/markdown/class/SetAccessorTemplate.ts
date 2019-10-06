export const SET_ACCESSOR_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:**      

{{name|print('-','','')}}

**Type:**      

{{type|print('-','','')}}

{% if modifiers|is_available %}
    **Modifier(s):** 

    {{modifiers|print_modifiers}}

{% endif %}

{% if typeParameters|is_available %}
    **Type Parameter(s):** 

    {{typeParameters|print('','\`\`\`','\`\`\`','\n\n')}}

{% endif %}

**Parameter Name:** {{parameter.name|print('-','','')}}

**Parameter Type:** {{parameter.type|print('-','','')}}

`;
