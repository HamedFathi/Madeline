const del = require('del');
del.sync([
    'extractors/**/*.js',
    'extractors/**/*.map',
    'templates/**/*.js',
    'templates/**/*.map',
    'utilities/**/*.js',
    'utilities/**/*.map',
    'test/**/*.js',
    'test/**/*.map',
    'index.js',
    'index.js.map'
]);
