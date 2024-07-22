import { useState } from 'react';

const UploadScrapePage = () => {
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState('');

  // Handles the addition of files to the files state
  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  // Handles the addition of a new link to the links state
  const handleLinkAdd = () => {
    if (linkInput.trim()) {
      setLinks([...links, linkInput.trim()]);
      setLinkInput('');
    }
  };

  // Handles the removal of a specific file by index
  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Handles the removal of a specific link by index
  const handleLinkRemove = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Upload or Scrape</h1>
        
        {/* File Upload Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Upload Files</h2>
          <input
            type="file"
            multiple
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleFileChange}
          />
          <div className="mt-4">
            {files.length > 0 && (
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {file.name}
                    <button
                      onClick={() => handleFileRemove(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Link Addition Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add a Link</h2>
          <div className="flex">
            <input
              type="text"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="Enter URL"
              className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleLinkAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Add
            </button>
          </div>
          <div className="mt-4">
            {links.length > 0 && (
              <ul className="list-disc list-inside">
                {links.map((link, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {link}
                    <button
                      onClick={() => handleLinkRemove(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadScrapePage;
