/* eslint-disable */
const del = require('del');
/* eslint-disable */
del.sync([
    'src/**/*.js',
    'src/**/*.map',
    'test/**/*.js',
    'test/**/*.map',
    'index.js',
    'index.js.map',
    'dist',
    '.nyc_output',
    'coverage',
]);
