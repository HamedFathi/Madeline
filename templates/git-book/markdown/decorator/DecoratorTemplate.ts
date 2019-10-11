export const DECORATOR_TEMPLATE = `
**Name:** {{name|print('-','','')}}

**Attributes:**

{{isDecoratorFactory|print_boolean}} Decorator Factory

{% if parameters|is_available %}
    **Parameters:**

    {% for param in parameters %}
    {{param.value|print('-','\`\`\`','\`\`\`','\n')}}

    {% endfor %}
{% endif %}
`;
