export const INTERFACE_INDEXER_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Key:** {{key|print('-','','','')}}

**Value:** {{value|print('-','','','')}}

**Return Type:** {{returnType|print('-','','')}}

`;
