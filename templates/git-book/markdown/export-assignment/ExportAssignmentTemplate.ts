export const EXPORT_ASSIGNMENT_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

**Attribute:** {{isExportDefault|print_boolean}} Default

{% if modules|is_available %}
    **Module(s):**{{modules|print('','','','\n\n')}}

{% endif %}

**Source:**

{{text|print('','\`\`\`','\`\`\`','')}}

`;
