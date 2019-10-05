export const FUNCTION_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:**      

{{name|print('-','','')}}

**Return Type:**      

{{type|print('-','','')}}

**Attributes:**

{{isDecoratorFactory|print_boolean}} Generator

{{isDecoratorFactory|print_boolean}} Implementation

{{isDecoratorFactory|print_boolean}} Overload

{% if parameters|is_available %}
    **Parameters:**

    {% for param in parameters %}
    {{param.value|print('-','\`\`\`','\`\`\`','\n')}}

    {% endfor %}
{% endif %}

{% if modules|is_available %}
    **Module(s):** 

    {{modules|print('','','','\n\n')}}

{% endif %}

`;
