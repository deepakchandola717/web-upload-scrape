const fs = require('fs').promises;
const path = require('path');
const config = require('../config');
const queue = require('../queue');
// const { addUpload, updateUpload } = require('../store/uploads');

exports.processFile = async (file) => {
  const tempFilePath = path.join(__dirname, '../../', config.tempDirectory, file.filename);
  const finalFilePath = path.join(__dirname, '../../', config.uploadDirectory, file.filename);
  const fileId = file.filename; // Use filename or generate a unique ID

  // addUpload(fileId, 'uploaded');

  try {
    // Add file processing task to the queue
    await queue.add({
      filename: file.filename,
      path: tempFilePath
    }).catch((err) => {
      console.error(`Error adding file to queue: ${err.message}`);
      // updateUpload(fileId, 'failed');
      throw new Error(`Failed to add file to processing queue: ${err.message}`);
    });
  } catch (err) {
    console.error(`Error during file processing: ${err.message}`);
    await fs.unlink(tempFilePath);
    // updateUpload(fileId, 'failed');
    return; // Do not move file if processing fails
  }

  try {
    // Ensure the upload directory exists
    await fs.mkdir(path.join(__dirname, '../../', config.uploadDirectory), { recursive: true });

    // Move the file from temp to final directory
    await fs.rename(tempFilePath, finalFilePath);
    console.log(`File moved to final directory: ${finalFilePath}`);
    // updateUpload(fileId, 'completed');
  } catch (err) {
    console.error(`Error moving file to final directory: ${err.message}`);
    // updateUpload(fileId, 'failed');

    // If there's an error, delete the file from the final location if it exists
    try {
      await fs.unlink(finalFilePath);
      console.log(`Cleaned up file at final location: ${finalFilePath}`);
    } catch (cleanupErr) {
      console.error(`Error during cleanup: ${cleanupErr.message}`);
    }
  }
};

