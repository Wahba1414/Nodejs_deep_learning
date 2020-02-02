// Constructor.
// will create objects from it by 'new' keyword.
// to link a prperty to the object, it should be assigned to 'this'
var stopWatch1 = {
  startTime: 0,
  endTime: 0,
  _duration: 0,
  inprogress: 0,

  start: function () {
    if (this.inprogress) {
      throw new Error('The stop watch is already started');
    }

    this.inprogress = true;

    this.startTime = new Date();

  },

  end: function () {
    if (!this.inprogress) {
      throw new Error('The stop watch is already stopped');
    }

    this.inprogress = false;

    this.endTime = new Date();

    // accumlate to duration field.
    this._duration += (this.endTime - this.startTime) / 1000; //in seconds

  },

  reset: function () {
    this._duration = 0;
  },

  // to create getter/setter here we should do the following.
  get duration() {
    console.log(`Durration: ${this._duration}`);
    return this._duration;
  }


}


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