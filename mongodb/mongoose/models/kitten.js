const mongoose = require('mongoose');

// methods & hooks.
const methods = require('../plugins/methods');
const hooks = require('../plugins/hooks');

var schema = new mongoose.Schema({

  createdDate: Date,

  name: { type: String, uppercase: true, index: true, unique: true },

  age: {
    type: Number,
    // This validation can be provided by built-in min and max.
    validate: {
      validator: function (v) {
        if (v > 1000) {
          return false;
        }

        return true; //otherwise.
      },

      message: () => 'This age is greater than 1000',
    }
  }
});

// methods.
schema.plugin(methods);

// hooks.
schema.plugin(hooks);

// virtuals.
schema.virtual('nameWithAge').get(function () {
  return this.name + '-' + this.age;
});

// define default options for toObject, toJSON.
schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

module.exports = schema;