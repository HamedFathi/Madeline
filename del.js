/* eslint-disable */
const del = require('del');
/* eslint-disable */
del.sync([
    'extractors/**/*.js',
    'extractors/**/*.map',
    'templates/**/*.js',
    'templates/**/*.map',
    'utilities/**/*.js',
    'utilities/**/*.map',
    'test/extractors/**/*.js',
    'test/extractors/**/*.map',
    'index.js',
    'index.js.map',
    'dist'
]);
