/* Used to run commands in outside shell and get its stdout,
stderr as Buffers.
*/
'use strict';
var { exec } = require('child_process');

var command = 'cd .. && ls';
var commandHandler = function (err, stdout, stderr) {
  if (err) {
    console.log(`error: ${err}`);
    console.log(`stderr: ${stderr}`);
    return;
  }

  console.log(`results: ${stdout}`);

}

var childProcess = exec(command, commandHandler);

console.log(`child Process: ${childProcess}`);
console.log(`child Process PID : ${childProcess.pid}`);

setInterval(() => {
  console.log('App is running')
}, 5000);


