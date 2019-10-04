export const ENUM_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:**      

{{name|print('-','','')}}

**Modifiers:** 

{{modifiers|print('-','','')}}

{% if modules|is_available %}
    **Modules:** 

    {{modules|print('','','','\n\n')}}

{% endif %}

**Members:** 

{% for member in members %}
    {{member.text|print('-','','','\n')}}

{% endfor %}
`;
