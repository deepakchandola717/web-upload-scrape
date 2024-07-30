const multer = require('multer');
const path = require('path');
const config = require('../config');

// Define file filter settings for Multer
const fileFilter = (req, file, cb) => {
  // Check file type
  const filetypes = /jpeg|jpg|png|gif|mp4|mkv|mov/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  console.log('extname', extname);
  console.log('mimetype', mimetype);

  // if (!extname || !mimetype) {
  //   return cb(new Error('Invalid file type. Only JPEG, PNG, GIF, MP4, MOV, and MKV files are allowed.'));
  // }

  // Check file name
  // if (!/^[a-zA-Z0-9_.-]*$/.test(file.originalname)) {
  //   return cb(new Error('Invalid file name. Only letters, numbers, underscores, hyphens, and dots are allowed.'));
  // }

  // Add any custom validations if needed
  const customValidation = (file) => {
    // Add your custom validation logic here
    return true; // or false based on the validation
  };

  if (!customValidation(file)) {
    return cb(new Error('Custom validation failed.'));
  }

  // All validations passed
  cb(null, true);
};

// Define storage settings for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tempDir = path.join(__dirname, '../../', config.tempDirectory);
    console.log(`Uploading to temporary directory: ${tempDir}`);
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    console.log(`Uploading file with original name: ${file.originalname}`);
    cb(null, file.originalname);
  }
});

// Define upload settings for Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: config.maxFileSize }, // Limit the file size
  fileFilter: fileFilter
}).single('file'); // Accept a single file with the field name 'file'

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(`Error during file upload: ${err.message}`);
      return res.status(400).send({ message: err.message });
    }
    next();
  });
};
