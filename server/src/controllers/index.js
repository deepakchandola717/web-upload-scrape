const fileService = require('../services');
exports.uploadFile = (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Send immediate response to client
    res.status(200).json({ message: 'File uploaded successfully' });

    // Process the file using the file service asynchronously
    fileService.processFile(file).catch((error) => {
      console.error('Error processing file:', error);
      // Handle any cleanup or notifications if needed
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};