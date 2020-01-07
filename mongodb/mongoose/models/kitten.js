const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String, uppercase: true, index: true, unique: true },

  age: Number
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