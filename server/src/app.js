// Import necessary modules
const express = require('express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const fileQueue = require('./queue'); 
const fileRoutes = require('./routes');

// Create an Express application
const app = express();

app.use(require('express-status-monitor')());

// Setup Bull Board
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullAdapter(fileQueue)],
  serverAdapter: serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

// Middleware to parse JSON bodies
app.use(express.json());

// Define a middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Use the file routes for all /api/files endpoints
app.use('/api/files', fileRoutes);

// Default route for the root
app.get('/', (req, res) => {
  res.send('Welcome to the File Upload Service');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app module
module.exports = app;
