# Caesar-cipher-CLI-tool<br/>
[description](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md#task-1-caesar-cipher-cli-tool)<br/>

RS School NodeJS course<br/>
You can generate a new repository with the same directory structure and files as an existing repository using GitHub article: Creating a repository from a template.<br/>

N.B. This structure is recommended for the implementation tasks starting from the second. The first task is not related to subsequent ones.<br/>

Task 1. Caesar cipher CLI tool<br/>
Implement CLI tool that will encode and decode a text by Caesar cipher.<br/>

CLI tool should accept 4 options (short alias and full name):<br/>

-s, --shift: a shift<br/>
-i, --input: an input file<br/>
-o, --output: an output file<br/>
-a, --action: an action encode/decode<br/>
Details:<br/>

For command-line arguments could be used one of<br/>
https://www.npmjs.com/package/commander<br/>
https://www.npmjs.com/package/minimist or any other module.<br/>
Action (encode/decode) and the shift are required, if one of them missed - an error should be shown, the process should exit with non-zero status code.<br/>
If the input file is missed - use stdin as an input source.<br/>
If the output file is missed - use stdout as an output destination.<br/>
If the input and/or output file is given but doesn't exist or you can't read it (e.g. because of permissions or it is a directory) - human-friendly error should be printed in stderr.<br/>
If passed params are fine the output (file or stdout) should contain encoded/decoded content of input (file or stdin).<br/>
For encoding/decoding use only the English alphabet, all other characters should be kept untouched.<br/>
Hints: As suggested solution to make streams code more robust, and memory effective, consider to use pipeline method. Structure can be the following:<br/>

pipeline(<br/>
  input_stream, // input file stream or stdin stream<br/>
  transform_stream, // standard Transform stream or https://github.com/rvagg/through2<br/>
  output_stream // output file stream or stdout stream<br/>
)
.then(success and error callbacks)<br/>
Usage example:<br/>

$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"<br/>
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt<br/>
$ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt<br/>

$ node my_caesar_cli -a encode -s 7<br/>
ПрИвЕт Мир!

input.txt This is secret. Message about "_" symbol!<br/>
output.txt Aopz pz zljyla. Tlzzhnl hivba "_" zftiv!
