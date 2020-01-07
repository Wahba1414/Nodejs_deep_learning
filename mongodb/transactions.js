//online example based on run-rs npm package to setup replica-set locally.

const assert = require('assert');
const { MongoClient } = require('mongodb');

run().catch(error => console.error(error.stack));

async function run() {
  const uri = 'mongodb://localhost:27017,localhost:27018,localhost:27019/test?' +
    'replicaSet=rs';
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  const coll = client.db('test').collection('Answer');
  await client.db('test').dropDatabase();
  // You need to explicitly create a collection before starting a transaction
  // Otherwise you'll get an error:
  // "Cannot create namespace test.Answer in multi-document transaction"
  await client.db('test').createCollection('Answer', {});

  const session = client.startSession();
  session.startTransaction();

  // Insert a doc and check that MongoDB stored it
  await coll.insertOne({ answer: 42 }, { session });
  doc = await coll.findOne({}, { session });
  assert.ok(doc);

  // Abort the transaction and undo the write
  // await session.abortTransaction();

  //Commit this transaction.
  await session.commitTransaction(); // commits changes and make them available for other queries.

  session.endSession();

  console.log('Done');
}