/*
The same as MongoDB
Style: use instances of objects, client, db, collection, etc.
Asyncronous protocl: first error argument callbacks. (can change it by util.promisify to be promise-based)

except for it connects directly to the db. (Not to the server first).
.model: to connect to a collection binding it with related schema. (The main thing it adds over MongoDB)
*/

const mongoose = require('mongoose');

const KittenSchema = require('./models/kitten');

const url = 'mongodb://localhost:27017/test'; //notice the db name is added here.

// default mongoose connection (event emitter)
mongoose.connection.on('open', function () {
  console.log(`db is ready`);

  // Do some operations.
  addNewKitten('Nono31', 130);

  // findSpecificOne('NONO3');

});

mongoose.connection.on('error', function (error) {
  console.log(`Error happened during db connection: ${error}`);
});

mongoose.connect(url, {
  useNewUrlParser: true, //new parser engine.
  useUnifiedTopology: true, // new engine for connection.
  useCreateIndex: true, //use create Index instead of deprecated ensureIndex function.
});

function addNewKitten(name, age) {
  // create model.
  var Kitten = mongoose.model('Kitten', KittenSchema);

  var newKitten = new Kitten({ name: name, age });

  newKitten.speak();

  newKitten.save().then(function (result) {
    console.log(`results: ${result}`);
  }, function (error) {
    console.log(`Error happened: ${error}`);
  })

}

function findSpecificOne(name) {
  // create model.
  var Kitten = mongoose.model('Kitten', KittenSchema);

  Kitten.find().findByName(name).then(function (result) {
    console.log(`Find Result: ${result.length}`);
    console.log(result[0].nameWithAge); //virtual getter.
  });

}