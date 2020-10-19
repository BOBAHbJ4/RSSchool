// Import
const {dataTransformation} = require('./modules/data_transformation.js');
const {getOutputFile, getInputFile, testArgs} = require('./modules/console_arguments.js');

testArgs(); // Validate the console arguments
dataTransformation(getInputFile(), getOutputFile()); // Transform data
