export const INTERFACE_TEMPLATE = `
{% if description|is_available %}
    **Summary:** 

    {{description|print('','','','\n\n')}}

{% endif %}

{% if name|is_available %}
    **Name:** {{name|print('-','','')}}

{% endif %}

{% if extends|is_available %}
    **Extends:** {{extends|print('-','','')}}

{% endif %}

{% if modifiers.length > 1 %}
    **Modifier(s):** {{modifiers|print_modifiers}}

{% endif %}

{% if typeParameters|is_available %}
    **Type Parameter(s):** 

    {{typeParameters|print('','\`\`\`','\`\`\`','\n\n')}}

{% endif %}

{% if modules|is_available %}
    **Module(s):** 

    {{modules|print('','','','\n\n')}}

{% endif %}

{% if constructors|is_available %}
    ❱❱{{'**Constructor(s):**'|whitespace(2)}}
    {% for constructor in constructors %}
        {{constructor|print('-','\`\`\`','\`\`\`','\n')|whitespace(5)}}

    {% endfor %}
{% endif %}

{% if properties|is_available %}
    ❱❱{{'**Properties:**'|whitespace(2)}}
    {% for property in properties %}
        {{property|print('-','\`\`\`','\`\`\`','\n')|whitespace(5)}}

    {% endfor %}
{% endif %}

{% if methods|is_available %}
    ❱❱{{'**Method(s):**'|whitespace(2)}}
    {% for method in methods %}
        {{method|print('-','\`\`\`','\`\`\`','\n')|whitespace(5)}}

    {% endfor %}
{% endif %}

{% if callSignatures|is_available %}
    ❱❱{{'**Call Signature(s):**'|whitespace(2)}}
    {% for callSignature in callSignatures %}
        {{callSignature|print('-','\`\`\`','\`\`\`','\n')|whitespace(5)}}

    {% endfor %}
{% endif %}

{% if indexers|is_available %}
    ❱❱{{'**Indexer(s):**'|whitespace(2)}}
    {% for indexer in indexers %}
        {{indexer|print('-','\`\`\`','\`\`\`','\n')|whitespace(5)}}

    {% endfor %}
{% endif %}

`;
