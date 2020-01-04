/*
Style: use instances of objects, client, db, collection, etc.
Asyncronous protocl: first error argument callbacks. (can change it by util.promisify to be promise-based)
*/
// MongoDB client.
var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

// Create instance of MongoClient.
// This option to use the new engine for monitor, etc. instead of the old deprecated one.
var client = MongoClient(url, { useUnifiedTopology: true });

// connect.
client.connect(function (error) {
  if (error) {
    console.log(`Something wrong happens during connecting to Mongodb server.`);
  } else {
    console.log(`Connecting to MongoDB succeeded`);

    readOnePayslip();

  }
});

function connectToPayslipsCollection() {
  var dbName = 'test';
  // collection name will be the actual name in db, otherwise in Mongoose will be as the model name in the code.
  var payslipCollection = 'payrollworkers';

  var db = client.db(dbName);

  var payslips = db.collection(payslipCollection);

  return payslips;
}

function readOnePayslip() {

  var payslips = connectToPayslipsCollection();

  payslips.find().limit(1).toArray(function (err, results) {
    if (!err) {
      console.log(`Results: ${JSON.stringify(results)}`);
    }
  });
}
