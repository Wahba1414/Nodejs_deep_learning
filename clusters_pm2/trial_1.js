const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

/*
-Try the IPC forth and back.
-Different events and the lifecycle of the worker ---> connected first and then listening, etc.
*/

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();

  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

  // cluster.workers is an object. id ---> 1, 2 , etc.
  for (let id in cluster.workers) {
    // Add events.

    // for listening
    cluster.workers[id].on('listening', function listeningHandler() {
      console.log(`worker id ${id} is listening now ...`);
    });


    cluster.workers[id].on('online', function listeningHandler() {
      console.log(`worker id ${id} is online now ...`);
    });

    // for messages.
    cluster.workers[id].on('message', function msgHandler(msg) {
      console.log(`msg from worker index ${id} : ${msg}`);
    })


    // send some message.
    cluster.workers[id].send({ id: 'Greeting' }, null, function (error) {
      if (error) console.log(error);
    });

  }


} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(9000);

  console.log(`Worker ${process.pid} started`);

  // Send message.
  cluster.worker.send('I am here now', null, function (error) {
    if (error) console.log(error);
  });

  // receive msg.
  cluster.worker.on('message', function (msg) {
    console.log(`worker(${cluster.worker.id})::Received msg: ${JSON.stringify(msg)}`);
    cluster.worker.send('hi there');
  })

}