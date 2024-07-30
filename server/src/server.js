// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const app = require('./app');
const config = require('./config');

// Define the port from environment variables or fallback to default
const PORT = config.port;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
