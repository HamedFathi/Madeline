export const PROPERTY_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:**      

{{name|print('-','','')}}

**Attributes:** {{isOptional|print_boolean}} Optional

**Type:**      

{{type|print('-','','')}}

{% if modifiers|is_available %}
    **Modifier(s):** 

    {{modifiers|print_modifiers}}

{% endif %}

**Initializer:** 

{{initializer|print('-','','')}}

{% if decorators|is_available %}
    **Decorator(s):** 

    {{decorators|print('-','','')}}

{% endif %}

`;
