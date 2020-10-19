const fs = require('fs');
const {pipeline} = require('stream');
const {coder} = require('./stream.js');

function dataTransformation(inputFile, outputFile) {
    let source;
    if(inputFile) {
        source = fs.createReadStream(inputFile);
    } else {
        source = process.stdin;
    }
    let target;
    if (outputFile) {
        target = fs.createWriteStream(outputFile, {flags: 'a'});
    } else {
        target = process.stdout;
    }
    pipeline(source, coder, target, err => {
        if (err) {
            process.stderr.write(err.message + '\n');
            process.exit(1);
        }
    });
}

module.exports = {
    dataTransformation
};
