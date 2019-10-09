export const INTERFACE_EXTENDS_TEMPLATE = `
{% if name|is_available %}
    **Name:** {{name|print('','','','\n\n')}}

{% endif %}

**Type:** {{type|print('-','','')}}

`;
