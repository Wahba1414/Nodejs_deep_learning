/*
The event loop will handle events as follows (priority-ordered):
1-Sync. codes.
2-nextTick callbacks.
3-setTimeout/setIntervals callbacks.
4-OS-operations / pending operations call backs (http, fs, etc.)
5-setImmediate callbacks.
*/

var http = require('http');

// sync. normal statement
var counter = 0;
console.log(`counter: ${counter}`);


http.get('http://www.google.com', function () {
  console.log(`from inside http response`);
})

setImmediate(function () {
  console.log(`from set Immediate`);
});


counter++;
console.log(`counter: ${counter}`);

process.nextTick(function () {
  console.log(`From inside nextTick, a = ${a}`);
})

console.log(`From normal flow, a = ${a}`);

var a = 2;

setTimeout(function () {
  console.log(`from inside setTimeout (0ms)`);
}, 0);

setTimeout(function () {
  console.log(`from inside setTimeout (1000ms)`);
}, 1000);

counter++;
console.log(`counter: ${counter}`);
