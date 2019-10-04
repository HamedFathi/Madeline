export const TYPE_PARAMETER_TEMPLATE = `
**Name:**       

{{name|print('-','','')}}

**Text:**       

{{text|print('-','','')}}

{% if constraint|is_available %}
**Constraint:** 

{{constraint|print('-','','')}}
{% endif %}

`;
