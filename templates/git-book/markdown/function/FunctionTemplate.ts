export const FUNCTION_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:** {{name|print('-','','')}}

{% if modifiers.length > 1 %}
    **Modifier(s):** {{modifiers|print_modifiers}}

{% endif %}

{% if returnType|is_available %}
    **Return Type:** {{returnType|print('-','','')}}

{% endif %}

**Attributes:** {{isGenerator|print_boolean}} Generator{% if isOverload|is_available %}{{isOverload|print_boolean|whitespace(5)}} Implementation{% endif %}{% if isImplementation|is_available %}{{isImplementation|print_boolean|whitespace(5)}} Overload{% endif %}

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

        {{'**Attributes:**'|whitespace(5)}}{{isOptional|print_boolean}} Optional{{isRest|print_boolean|whitespace(5)}} Rest{{isParameterProperty|print_boolean|whitespace(5)}} Parameter Property

        {% if param.initializer|is_available %}
            {{'**Initializer:**'|whitespace(5)}}

            {{param.initializer|print('-','','')|whitespace(5)}}
    
        {% endif %}

    {% endfor %}
{% endif %}

{% if modules|is_available %}
    **Module(s):**{{modules|print('','','','\n\n')}}

{% endif %}

`;
