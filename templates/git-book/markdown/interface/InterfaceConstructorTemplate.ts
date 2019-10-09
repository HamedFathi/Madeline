export const INTERFACE_CONSTRUCTOR_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Return Type:** {{returnType|print('-','','')}}

{% if typeParameters|is_available %}
    **Type Parameter(s):** 

    {{typeParameters|print('','\`\`\`','\`\`\`','\n\n')}}

{% endif %}

{% if parameters|is_available %}
    ❱❱{{'**Parameters:**'|whitespace(2)}}
    {% for param in parameters %}
        {{param|print('-','\`\`\`','\`\`\`','\n\n')|whitespace(5)}}

    {% endfor %}
{% endif %}

`;
