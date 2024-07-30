
# File Upload Service

A robust Node.js application for uploading files with support for streaming and chunking, using queues to handle high load efficiently.

## Features

- **File Uploads**: Upload files using streams to handle large file sizes.
- **Queue System**: Process files using Bull and Redis to manage high load.
- **Environment Configuration**: Easily configurable using environment variables.
- **Temporary and Permanent Storage**: Manage temporary and permanent storage locations for uploaded files.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [Redis](https://redis.io/) (for the queue system)

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/file-upload-service.git
   cd file-upload-service
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the root directory and add the following environment variables:
   ```plaintext
   PORT=3000
   UPLOAD_DIRECTORY=public/uploads
   TEMP_DIRECTORY=public/temp
   MAX_FILE_SIZE=52428800
   QUEUE_REDIS_URL=redis://127.0.0.1:6379
   ```

## Usage

1. **Start the Redis server**:
   ```sh
   redis-server
   ```

2. **Start the application**:
   ```sh
   npm start
   ```

3. **Development mode** (with auto-restart on changes):
   ```sh
   npm run dev
   ```

4. **Upload Files**:
   - Endpoint: `POST /api/files/upload`
   - Field Name: `file`
   - Use a tool like Postman or curl to upload files.

## Project Structure

```plaintext
my-upload-app/
├── src/
│   ├── controllers/
│   │   ├── index.js
│   ├── routes/
│   │   ├── index.js
│   ├── services/
│   │   ├── index.js
│   ├── queue/
│   │   ├── index.js
│   ├── middlewares/
│   │   ├── index.js
│   ├── utils/
│   │   ├── index.js
│   ├── config/
│   │   ├── index.js
│   ├── app.js
│   ├── server.js
├── public/
│   ├── uploads/
│   └── temp/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [Bull](https://github.com/OptimalBits/bull)
- [dotenv](https://github.com/motdotla/dotenv)
