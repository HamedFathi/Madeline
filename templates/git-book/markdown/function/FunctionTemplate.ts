export const FUNCTION_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:**      

{{name|print('-','','')}}

{% if modifiers.length > 1 %}
    **Modifier(s):** 

    {{modifiers|print_modifiers}}

{% endif %}

{% if returnType|is_available %}
    **Return Type:**      

    {{returnType|print('-','','')}}

{% endif %}

**Attributes:**

{{isGenerator|print_boolean}} Generator

{% if isOverload|is_available %}
    {{isOverload|print_boolean}} Implementation

{% endif %}
{% if isImplementation|is_available %}
    {{isImplementation|print_boolean}} Overload

{% endif %}

{% if typeParameters|is_available %}
    **Type Parameter(s):** 

    {{typeParameters|print('','\`\`\`','\`\`\`','\n\n')}}

{% endif %}

{% if parameters|is_available %}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Parameters:**

    {% for param in parameters %}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{param.name|print('-','\`\`\`','\`\`\`','\n')}}

        {% if param.type|is_available %}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Type:**      
    
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{param.type|print('-','','')}}
    
        {% endif %}

        {% if param.modifiers %}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Modifier(s):** 

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{param.modifiers|print_modifiers}}

        {% endif %}

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Attributes:**

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{isOptional|print_boolean}} Optional

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{isRest|print_boolean}} Rest

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{isParameterProperty|print_boolean}} Parameter Property

        {% if param.initializer|is_available %}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Initializer:**      
    
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{param.initializer|print('-','','')}}
    
        {% endif %}

    {% endfor %}
{% endif %}

{% if modules|is_available %}
    **Module(s):** 

    {{modules|print('','','','\n\n')}}

{% endif %}

`;
