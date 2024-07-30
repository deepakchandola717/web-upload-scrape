// Load environment variables from .env file
require('dotenv').config();

// Export configuration settings
module.exports = {
  port: process.env.PORT || 3000, // Define the port from environment variables or fallback to default
  uploadDirectory: process.env.UPLOAD_DIRECTORY || 'public/uploads', // Define the upload directory from environment variables or fallback to default
  tempDirectory: process.env.TEMP_DIRECTORY || 'public/temp', // Define the temporary directory from environment variables or fallback to default
  maxFileSize: process.env.MAX_FILE_SIZE || 50 * 1024 * 1024, // Max file size (50MB as default)
  queueRedisUrl: process.env.QUEUE_REDIS_URL || 'redis://localhost:6379', // Redis URL for the queue system
  redisHost: process.env.REDIS_HOST || 'localhost', // Redis host
  redisPort: process.env.REDIS_PORT || 6379, // Redis port
  redisPassword: process.env.REDIS_PASSWORD || '', // Redis password
};
