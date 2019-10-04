export const TYPE_ALIAS_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Name:**      

{{name|print('-','','')}}

**Type:**      

{{type|print('-','','')}}

**Modifier(s):** 

{{modifiers|print('-','','')}}

**Initializer:** 

{{initializer|print('-','','')}}

{% if typeParameters|is_available %}
    **Type Parameter(s):** 

    {{typeParameters|print('','','','\n\n')}}

{% endif %}

{% if modules|is_available %}
    **Module(s):** 

    {{modules|print('','','','\n\n')}}

{% endif %}

`;
