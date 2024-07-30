const express = require('express');
const router = express.Router();
const fileController = require('../controllers');
const uploadMiddleware = require('../middlewares');

// Define the route for uploading files
router.post('/upload', uploadMiddleware, fileController.uploadFile);

module.exports = router;
