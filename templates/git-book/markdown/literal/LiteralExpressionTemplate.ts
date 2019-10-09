export const LITERAL_EXPRESSION_TEMPLATE = `
**Attribute:** {{isObjectLiteral|print_boolean}} Object Literal

{% if assignments|is_available %}
    {{**Assignment(s):**}}
    {% for assignment in assignments %}
        {{assignment|print('-','','','\n')}}

    {% endfor %}
{% endif %}

{% if getAccessors|is_available %}
    {{**Get Accessor(s):**}}
    {% for getAccessor in getAccessors %}
        {{getAccessor|print('-','','','\n')}}

    {% endfor %}
{% endif %}

{% if setAccessors|is_available %}
    {{**Set Accessor(s):**}}
    {% for setAccessor in setAccessors %}
        {{setAccessor|print('-','','','\n')}}

    {% endfor %}
{% endif %}

{% if methods|is_available %}
    {{**Method(s):**}}
    {% for method in methods %}
        {{method|print('-','','','\n')}}

    {% endfor %}
{% endif %}
`;
