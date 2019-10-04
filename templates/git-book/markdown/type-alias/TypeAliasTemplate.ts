export const TYPE_ALIAS_TEMPLATE = `
{{description|print('','','','\n\n')}}

**Name:**      

{{name|print('-','','')}}

**Type:**      

{{type|print('-','','')}}

**Modifiers:** 

{{modifiers|print('-','','')}}

**Initializer:** 

{{initializer|print('-','','')}}

{% if typeParameters|is_available %}
    {{typeParameters|print('','','','\n\n')}}

{% endif %}

{% if modules|is_available %}
    {{modules|print('','','','\n\n')}}

{% endif %}

`;
