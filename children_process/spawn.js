/* Used to run commands in outside shell and get its stdout,
stderr as Streams.
*/
'use strict';
var { spawn } = require('child_process');

var command = 'ls';
var commandArgs = ['-l'];

var childProcess = spawn(command, commandArgs);

console.log(`child Process PID : ${childProcess.pid}`);

childProcess.stdout.on('data', (data) => {
  console.log(`Result:
   ${data}`);
});

childProcess.stderr.on('data', (data) => {
  console.log(`Error >>>> ${data}`);
});

childProcess.on('exit', () => {
  console.log('Command process is closed');
});

setInterval(() => {
  console.log('App is running')
}, 50000);


