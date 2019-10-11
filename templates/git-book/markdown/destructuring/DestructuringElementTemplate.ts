export const DESTRUCTURING_ELEMENT_TEMPLATE = `
**Name:** {{name|print('-','','')}}

{% if propertyName|is_available %}
    **Property Name:** {{propertyName|print('','','','\n')}}

{% endif %}

**Attribute:** {{isRest|print_boolean}} Rest

**Kind:** ✔ {{kindName}}

{% if typeReference|is_available %}
    **Type Reference:** 

    {{typeReference|print('','','','')}}

{% endif %}

{% if initializer|is_available %}
    **Initializer:** 

    {{initializer|print('','','','')}}

{% endif %}

`;
