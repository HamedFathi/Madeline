export const COMMENT_TEMPLATE = `
{% if description|is_available %}
    {% if option and option.append %}
        {{description|print('','','',' ')}}

    {% else %}
        {{description|print('','','','\n')}}

    {% endif %}
{% endif %}
{% for detail in details %}
    {% if detail.title|is_available %}
        ### {{detail.title}}

        {{detail.tags|write(option, detail.headers)}}
        
    {% endif %}    
{% endfor %}
`;
