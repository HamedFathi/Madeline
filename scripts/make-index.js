/* eslint-disable */
const glob = require('glob');
const fs = require('fs');
/* eslint-disable */

glob('./*(extractors|templates|utilities)/**/*.ts', function(er, files) {
    if (er) {
        return console.log(err);
    }
    let path = [];
    files.forEach(file => {
        let newFile = file.replace('.ts', '');
        path.push("export * from '" + newFile + "';");
    });
    fs.writeFile('./index.ts', path.join('\n'), function(err) {
        if (err) {
            return console.log(err);
        }
    });
});
