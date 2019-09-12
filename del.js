const del = require('del');
del.sync([
    'extractors/**/*.js',
    'extractors/**/*.map',
    'markdown/**/*.js',
    'markdown/**/*.map',
    'utilities/**/*.js',
    'utilities/**/*.map',
    'test/**/*.js',
    'test/**/*.map',
    'index.js',
    'index.js.map'
]);
