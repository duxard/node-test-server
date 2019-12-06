const fs = require("fs");

function sendFile(fileName, res) {
  // This line opens the file as a readable stream
  let readStream = fs.createReadStream(fileName);
  // This will wait until we know the readable stream is actually valid before piping
  readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });
  // This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
    res.statusCode = 500;
    res.end(err);
  });

  readStream.on('close', function() {
    readStream.destroy();
  });
}

module.exports = sendFile;
