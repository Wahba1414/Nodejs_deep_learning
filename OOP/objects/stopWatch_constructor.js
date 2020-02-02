// Constructor.
// will create objects from it by 'new' keyword.
// to link a prperty to the object, it should be assigned to 'this'
function StopWatch() {
  // local variables inside this function (virtually we can call them 'private variables')
  let startTime, endTime, duration = 0, inprogress;

  this.start = function () {
    if (inprogress) {
      throw new Error('The stop watch is already started');
    }

    inprogress = true;

    startTime = new Date();

  }

  this.end = function () {
    if (!inprogress) {
      throw new Error('The stop watch is already stopped');
    }

    inprogress = false;

    endTime = new Date();

    // accumlate to duration field.
    duration += (endTime - startTime) / 1000; //in seconds

  }

  this.reset = function () {
    duration = 0;
  }

  // to create getter/setter here we should do the following.
  Object.defineProperty(this, 'duration', {
    get: function () {
      console.log(`Duration: ${duration}`);
      return duration;
    },
    // value: //somevalue,
  })


}

var stopWatch1 = new StopWatch();

stopWatch1.start();
// stopWatch1.start(); //exception

setTimeout(() => {
  stopWatch1.end();

  // stopWatch1.end(); //exception.

  stopWatch1.duration;

  // to reset.
  stopWatch1.reset();

  stopWatch1.start();
  setTimeout(() => {
    stopWatch1.end();
    stopWatch1.duration;
  }, 1000)
}, 2000);