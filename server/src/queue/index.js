const Queue = require('bull');
const config = require('../config');
// const sharp = require('sharp'); // Example for image processing
// const ffmpeg = require('fluent-ffmpeg'); // Example for video processing

// Create a Bull queue for file processing
const fileQueue = new Queue('file-processing', config.queueRedisUrl);

fileQueue.process(async (job) => {
  const file = job.data;
  try {
    // Perform additional processing based on file type
    // if (file.filename.endsWith('.jpg') || file.filename.endsWith('.png')) {
    //   await processImage(file);
    // } else if (file.filename.endsWith('.mp4') || file.filename.endsWith('.mkv')) {
    //   await processVideo(file);
    // }

    console.log(`Processed file: ${file.filename}`);
  } catch (error) {
    console.error(`Failed to process file: ${file.filename}`, error);
    throw error;
  }
});

// Function to process images
async function processImage(file) {
  const filePath = file.path;
  const processedPath = filePath.replace(/(\.[\w\d_-]+)$/i, '_processed$1');

  await sharp(filePath)
    .resize(800, 600) // Example resize
    .toFile(processedPath);

  console.log(`Image resized and saved to: ${processedPath}`);
}

// Function to process videos
async function processVideo(file) {
  const filePath = file.path;
  const processedPath = filePath.replace(/(\.[\w\d_-]+)$/i, '_processed$1');

  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .output(processedPath)
      .size('800x600') // Example resize
      .on('end', () => {
        console.log(`Video resized and saved to: ${processedPath}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error processing video: ${file.filename}`, err);
        reject(err);
      })
      .run();
  });
}

exports.add = async (file) => {
  await fileQueue.add(file);
};

fileQueue.on('completed', (job) => {
  console.log(`Job completed with result: ${job.returnvalue}`);
});

fileQueue.on('failed', (job, err) => {
  console.error(`Job failed with error: ${err.message}`);
});


module.exports = fileQueue;