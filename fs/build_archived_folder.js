const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
var rimraf = require("rimraf");



// Build a new folder on the fly. (here, will get the files' data from another folder, but can come from other ways, 
//like, S3, etc.)
function buildNewFolder(from, to) {
  fs.readdir(from, (err, files) => {
    if (err) {
      console.log(`something wrong happened: ${err}`);
      return;
    }

    // create new folder.
    fs.mkdir(to, (err) => {
      if (err) {
        console.log(`something wrong happened: ${err}`);
        return;
      }

      files.forEach((file) => {
        // read content of each file.

        // fs.readFile(path.resolve(from, file), (err, data) => {
        //   if (err) {
        //     console.log(`something wrong happened: ${err}`);
        //     return;
        //   }

        //   console.log(`${data}`);

        // });

        // To write some data directly.
        // fs.writeFile('message.txt', data, (err) => {
        //   if (err) throw err;
        //   console.log('The file has been saved!');
        // });

        var readStream = fs.createReadStream(path.resolve(from, file));
        var writeStream = fs.createWriteStream(path.resolve(to, file));

        readStream.pipe(writeStream);

      });

    });


  });

}


//Archive a folder.
function createArchivedFolder(source) {

  try {

    var output = fs.createWriteStream(__dirname + '/archived.zip');

    var archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
      console.log('Data has been drained');
    });

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      throw err;
    });

    archive.pipe(output);

    fs.readdir(from, (err, files) => {
      if (err) {
        console.log(`something wrong happened: ${err}`);
        return;
      }

      files.forEach((file) => {
        archive.append(fs.createReadStream(path.resolve(source, file)), { name: file });
      });

      archive.finalize();

    });



  } catch (error) {
    console.log(`Something wrong happened: ${err}`);
  }


}

//Read archived folder to make use of its data (for example: upload to AWS S3).

//Remove a folder.
function removeSomeFolder(path) {
  // fs.unlink(path, (err) => {
  //   console.log(`Error happened: ${err}`);
  // });

  rimraf(path, function () { console.log("done"); });

}

function removeSomeFile(path) {
  fs.unlink(path, (err) => {
    if (err) {
      console.log(`Error happened: ${err}`);
    } else {
      console.log('done');
    }
  });
}


// Test scenario.
var from = './fs/start';
var to = './fs/end';

// buildNewFolder(from, to);
// createArchivedFolder(to);
// removeSomeFolder(to);
// removeSomeFile('./fs/archived.zip');