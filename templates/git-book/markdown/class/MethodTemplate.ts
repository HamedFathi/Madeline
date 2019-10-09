export const METHOD_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:**      

{{name|print('-','','')}}

**Attributes:** {{isGenerator|print_boolean}} Generator

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

{% if parameters|is_available %}
    ❱❱{{'**Parameters:**'|whitespace(2)}}
    {% for param in parameters %}
        {{param.name|print('-','\`\`\`','\`\`\`','\n')|whitespace(5)}}

        {% if param.type|is_available %}
            {{'**Type:**'|whitespace(5)}}{{param.type|print('-','','')}}
    
        {% endif %}

        {% if param.modifiers %}
            {{'**Modifier(s):**'|whitespace(5)}}{{param.modifiers|print_modifiers}}

        {% endif %}

        {{'**Attributes:**'|whitespace(5)}}{{param.isOptional|print_boolean}} Optional{{param.isRest|print_boolean|whitespace(5)}} Rest{{param.isParameterProperty|print_boolean|whitespace(5)}} Parameter Property

        {% if param.initializer|is_available %}
            {{'**Initializer:**'|whitespace(5)}}

            {{param.initializer|print('-','','')|whitespace(5)}}
    
        {% endif %}

        {% if param.decorators|is_available %}
            {{'**Decorator(s):**'|whitespace(5)}}

            {{param.decorators|print('-','','')|whitespace(5)}}

        {% endif %}
    {% endfor %}
{% endif %}

`;
