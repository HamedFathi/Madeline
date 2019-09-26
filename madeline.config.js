module.exports = {
    // Extractors with custom options
    extractors: {
        decorator: {
            export: true
        }
    },
    templates: {
        options: {
            // If true it appends all descriptions, otherwise it shows all descriptions line by line.
            append: true,
            // Extend nunjucks template engine by adding custom filters and ...
            engine: function(env) {
                return env;
            },
        },
        // Define all jsdoc tags and its equivalents.
        jsdocs: {
            tags: [{
                name: "@param",
                alternative: "Parameter"
            }]
        },
        // Make a new Module template.
        module: function(moduleTemplateInfo) {
            // Your new text template.
            return "";
        } 
    },
};