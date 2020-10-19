const {getAction, getShift} = require('./console_arguments.js');
const {encryptFun } = require('./caesar_cypher.js');

const stream = require('stream');
const coder = new stream.Transform({objectMode: true});


coder._transform = function (chunk, encoding, done) {
    try {
        done(null, encryptFun(chunk.toString(), getShift(), getAction()));
    } catch (e) {
        done(e);
    }
};

module.exports = {coder};
