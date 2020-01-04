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


    var candidateNoList = ['510964', '520954'];

    getTotalNetPayForSomeCandidates(candidateNoList); //By aggregation.

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

function getTotalNetPayForSomeCandidates(candidateNoList) {
  // Collection : payslips.

  var payslips = connectToPayslipsCollection();

  payslips.aggregate([ //aggregation pipeline: is an array of ordered stages.
    { '$match' : { 'workerInfo.candidateNo' : { $in: candidateNoList } } }, //like find

    // like find project & can add a new field as well.
    { '$project' : { '_id' : 0, 'netPay' : 1 , 'candidateNo' : '$workerInfo.candidateNo' } }, 

    // takes id for a field to group by, and the other field applies for each record in every group.
    { $group: { '_id': "$candidateNo", 'TotalNetPay' : { $sum: "$netPay" } } }
    
  ]).toArray(function (err, docs) { //toArray: to convert cursor to array.
    if (!err) {
      console.log(`Aggregated docs: ${JSON.stringify(docs)}`);
    } else {
      console.log(`Error happens during applying aggregation: ${err}`);
    }
  })

}