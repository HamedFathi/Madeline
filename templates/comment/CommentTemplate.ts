export const COMMENT_TEMPLATE = `
{% if description|is_available %}
    {% if append %}
        {{description|print('','','',' ')}}

    {% else %}
        {{description|print('','','','\n')}}

    {% endif %}
{% endif %}
{% for detail in details %}
    {% if detail.title|is_available %}
        ### {{detail.title}}

    {% endif %}
    {{detail.tags|write(append, detail.headers)}}
    
{% endfor %}
`;
