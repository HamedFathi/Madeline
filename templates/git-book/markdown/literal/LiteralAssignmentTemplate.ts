export const LITERAL_ASSIGNMENT_TEMPLATE = `

**Name:** {{name|print('-','','')}}

{% if value|is_available %}
    **Value:** {{value|print('-','','')}}

{% endif %}

**Type:** {{type|print('-','','')}}

**Attribute:** {{isSpread|print_boolean}} Spread

`;
