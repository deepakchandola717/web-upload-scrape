const fs = require('fs');
const path = require('path');
const config = require('../config');

exports.processFileChunks = async (file) => {
  return new Promise((resolve, reject) => {
    const filePath = file.path;
    const destinationPath = path.join(__dirname, '../../', config.uploadDirectory, file.filename);

    console.log(`Reading from: ${filePath}`);
    console.log(`Writing to: ${destinationPath}`);

    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(destinationPath);

    readStream.pipe(writeStream);

    readStream.on('error', (err) => {
      console.error(`Error reading file: ${file.filename}`, err);
      reject(err);
    });

    writeStream.on('error', (err) => {
      console.error(`Error writing file: ${file.filename}`, err);
      reject(err);
    });

    writeStream.on('finish', () => {
      console.log(`File processing complete: ${file.filename}`);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting temp file: ${file.filename}`, err);
          reject(err);
        } else {
          console.log(`Temp file deleted: ${file.filename}`);
          resolve();
        }
      });
    });
  });
};
