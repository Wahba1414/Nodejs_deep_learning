const fs = require('fs');

// Create a writtable stream to some file.
var writeStream = fs.createWriteStream('./file1.txt');

// Add some event listeners on this write stream.
writeStream.on('open' , function(fd){
  console.log(`The file is open now, fd: ${fd}`);
});

writeStream.on('close' , function(fd){
  console.log(`The file is closed now`);
});

// write some data to the file.
for(let i = 0; i < 5; i++){
  writeStream.write(i + '\n' );
}

// end stream.
writeStream.end();



