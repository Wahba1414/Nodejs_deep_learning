const mongoose = require('mongoose');

const options = {
  discriminatorKey: 'nationality',
};

const schema = new mongoose.Schema({
  isForeign: Boolean,
}, options);


module.exports = schema;