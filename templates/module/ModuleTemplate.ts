export const MODULE_TEMPLATE = `
**Name**      {{name|print('-','\`','\`')}}

**Type**      {{type|print('-','\`','\`')}}

**Modifiers** {{modifiers|print('-','\`','\`')}}

{{description|print('','','','\n\n')}}

#### Source

\`\`\`ts
{{text}}
\`\`\`
`;
