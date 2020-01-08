const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String, uppercase: true, index: true, unique: true },

  age: {
    type: Number,
    // This validation can be provided by built-in min and max.
    validate: {
      validator: function(v){
        if(v > 1000){
          return false;
        }

        return true; //otherwise.
      },

      message: () => 'This age is greater than 1000',
    }
  }
});


// you can add methods can be accessed through the instance from this schema.
schema.methods.speak = function () {
  console.log(`Hi, i am ${this.name}`);
}

// Add query functions.
schema.query.findByName = function (name) {
  return this.where({ name: name });
}

// virtuals.
schema.virtual('nameWithAge').get(function(){
  return this.name + '-' + this.age;
});

// define default options for toObject, toJSON.
schema.set('toJSON' , {virtuals: true});
schema.set('toObject' , {virtuals: true});

module.exports = schema;