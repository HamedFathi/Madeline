export const CALL_SIGNATURE_TEMPLATE = `
**returnType:** {{returnType|print('-','','')}}

{% if parameters|is_available %}
    ❱❱{{'**Parameter(s):**'|whitespace(2)}}
    {% for param in parameters %}
        {{param|print('-','','','\n')|whitespace(5)}}

    {% endfor %}
{% endif %}

{% if typeParameters|is_available %}
    ❱❱{{'**Type Parameter(s):**'|whitespace(2)}}
    {% for typeParam in typeParameters %}
        {{typeParam|print('-','','','\n')|whitespace(5)}}

    {% endfor %}
{% endif %}

`;
