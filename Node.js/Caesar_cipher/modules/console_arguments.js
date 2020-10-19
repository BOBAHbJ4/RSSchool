const ACTION = ['a', 'action']; // the required param
const INPUT_FILE = ['i', 'input'];
const OUTPUT_FILE = ['o', 'output'];
const SHIFT = ['s', 'shift']; // the required param

// Obtain the console arguments
const args = require('minimist')(process.argv.slice(2));

function errorHandler(err) {
    if (err) {
        process.stderr.write(err.message + '\n');
        process.exit(1);
    }
}

function getInputFile() {
    return args[INPUT_FILE[0]] || args[INPUT_FILE[1]];
}

function getOutputFile() {
    return args[OUTPUT_FILE[0]] || args[OUTPUT_FILE[1]];
}

function getAction() {
    return args[ACTION[0]] || args[ACTION[1]];
}

function getShift() {
    return args[SHIFT[0]] || args[SHIFT[1]];
}

function testArgs() {
    if (!getAction(args)) {
        errorHandler(new Error('there is no the following required argument: --action'));
    }
    if (!getShift(args)) {
        errorHandler(new Error('there is no the following required argument: --shift'));
    }
    const fs = require('fs');
    let file = getInputFile(args);
    if (file) {
        fs.access(file, fs.constants.R_OK, err => errorHandler(err));
    }
    file = getOutputFile(args);
    if (file) {
        fs.access(file, fs.constants.W_OK, err => errorHandler(err));
    }
}

module.exports = {
    testArgs,
    getInputFile,
    getOutputFile,
    getAction,
    getShift
};
