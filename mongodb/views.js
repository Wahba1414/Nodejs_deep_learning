/*
Prerequisties: create a view named 'total_netPays' on 'payrollworkers' collection to outputs the total netpay for
evvery candidate in the system as follows:

use test
db.createView('total_netpays', 'payrollworkers' , [{ '$match' : {} }, { '$project' : { '_id' : 0, 'netPay' : 1 , 'candidateNo' : '$workerInfo.candidateNo' } } , { $group: { '_id': "$candidateNo", 'TotalNetPay' : { $sum: "$netPay" } } }])

run it through Mongochef shell.

*/

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

    var candidatesNos = ['510964', '520954'];

    getTotalNetpayForSomeCandidates(candidatesNos);
  }
});

function connectToNetPayView() {
  var dbName = 'test';
  // collection name will be the actual name in db, otherwise in Mongoose will be as the model name in the code.
  var netpayCollection = 'total_netpays';

  var db = client.db(dbName);

  var netpays = db.collection(netpayCollection);

  return netpays;
}

function getTotalNetpayForSomeCandidates(candidatesNos) {
  var netpays = connectToNetPayView();

  netpays.find({ _id: { $in: candidatesNos } }).toArray(function (err, docs) {
    if (!err) {
      console.log(`Docs: ${JSON.stringify(docs)}`); //same results as aggregation example.
    } else {
      console.log(`Error: ${err}`);
    }
  })
}