export const COMMENT_TEMPLATE = `
{% if title|is_available %}
### {{title}}

{% endif %}
{% if description|is_available %}
    {% if append %}
        {{description|print('','','',' ')}}

    {% else %}
        {{description|print('','','','\n')}}

    {% endif %}
{% endif %}
{% if headers|is_available %}
    {% if headers|is_description_only %}
        {% if append %}

        {% else %}

        {% endif %}
    {% else %}
        {% if append %}

        {% else %}

        {% endif %}
    {% endif %}
{% else %}

{% endif %}
`;
