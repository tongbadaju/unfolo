import React, { useState, useRef, useCallback } from 'react';
import JSZip from 'jszip'; // A library for reading .zip files in JavaScript.
import ResultsList from '../components/ResultsList';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const navigate = useNavigate();
  // State to hold the final lists of users.
  const [notFollowingBack, setNotFollowingBack] = useState([]);
  const [fans, setFans] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  // UI state management.
  const [loading, setLoading] = useState(false); // Manages the loading spinner during processing.
  const [file, setFile] = useState(null); // Holds the uploaded .zip file object.
  const [showResults, setShowResults] = useState(false); // Toggles the visibility of the results section.
  const [error, setError] = useState(null); // Stores any error messages to display to the user.
  const [isDragging, setIsDragging] = useState(false); // Tracks if a file is being dragged over the dropzone for UI feedback.

  // Refs to interact with DOM elements directly.
  const fileInputRef = useRef(null); // A reference to the hidden file input element.
  const resultsRef = useRef(null); // A reference to the results container for smooth scrolling.

  /**
   * A centralized function to validate and set the uploaded file.
   * This is used by both the file input and the drag-and-drop handler.
   * @param {File} selectedFile - The file object to validate.
   */
  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    // Crucial check to ensure the user uploads the correct file type.
    if (!selectedFile.name.endsWith('.zip')) {
      setError('Please select a .zip file');
      return;
    }
    // If valid, update the state.
    setFile(selectedFile);
    setShowResults(false);
    setError(null);
  };
  
  /**
   * Handles file selection when the user clicks the upload area.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleFileSelect = (e) => {
    validateAndSetFile(e.target.files[0]);
    // Important: Reset the input value to allow re-uploading the same file if needed.
    e.target.value = '';
  };

  // --- Drag and Drop Event Handlers ---
  // useCallback is used for performance optimization, preventing these functions
  // from being recreated on every render unless their dependencies change.

  const handleDragEnter = useCallback((e) => {
    e.preventDefault(); // Prevents the browser's default behavior (e.g., opening the file).
    e.stopPropagation(); // Stops the event from bubbling up to parent elements.
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  /**
   * This handler is essential. Without preventing the default behavior on dragOver,
   * the 'drop' event will not fire.
   */
  const handleDragOver = useCallback((e) => {
    e.preventDefault(); 
    e.stopPropagation();
  }, []);

  /**
   * Handles the actual file drop, validates it, and updates the state.
   */
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // Access the dropped files from the dataTransfer object.
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData(); // Recommended for cleanup.
    }
  }, []);


  /**
   * The core logic for processing the uploaded ZIP file.
   * This function is asynchronous because reading and unzipping files takes time.
   */
  const processFile = async () => {
    if (!file) {
      alert('Please upload a ZIP file first.');
      return;
    }

    setLoading(true);

    try {
      // Initialize JSZip and load the file from memory.
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);

      // --- Find the required JSON files within the ZIP structure ---
      // This is the most critical part, as it relies on Instagram's data export structure.
      const followersPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/followers_1.json')
      );
      const followingPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/following.json')
      );
      // The pending requests file is optional, so the app won't break if it's not found.
      const pendingRequestsPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/pending_follow_requests.json')
      );

      // A crucial guard clause to ensure the essential files are present.
      if (!followersPath || !followingPath) {
        alert('Required files (followers_1.json, following.json) not found in ZIP.');
        setLoading(false);
        return;
      }

      // --- Asynchronously read the content of each file as a string ---
      const followersRaw = await loadedZip.files[followersPath].async('string');
      const followingRaw = await loadedZip.files[followingPath].async('string');

      // --- Parse the JSON strings into JavaScript objects ---
      const followersData = JSON.parse(followersRaw);
      const followingData = JSON.parse(followingRaw);

      // Process pending requests only if the file was found.
      let pendingRequestsList = [];
      if (pendingRequestsPath) {
        const pendingRequestsRaw = await loadedZip.files[pendingRequestsPath].async('string');
        const pendingRequestsData = JSON.parse(pendingRequestsRaw);
        // Extract usernames from the nested structure.
        pendingRequestsList = pendingRequestsData.relationships_follow_requests_sent.flatMap(item =>
          item.string_list_data.map(entry => entry.value)
        );
      }

      // --- Extract usernames from the complex data structures ---
      const followers = followersData.flatMap(item =>
        item.string_list_data.map(entry => entry.value)
      );
      
      // The 'following' file has a different structure, so we map over `item.title`.
      const following = followingData.relationships_following.map(item => item.title);

      // --- Core comparison logic to find unfollowers and fans ---
      const notFollowing = following.filter(user => !followers.includes(user));
      const fansList = followers.filter(user => !following.includes(user));

      // --- Update the state with the final results ---
      setNotFollowingBack(notFollowing);
      setFans(fansList);
      setPendingRequests(pendingRequestsList);
      setShowResults(true);

      // Smoothly scroll down to the results section for a better user experience.
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      alert('Error processing ZIP file. It might be corrupted or in an unexpected format.');
      console.error(err);
    }

    setLoading(false);
  };

  /**
   * Resets the entire application state to allow for a new file upload.
   */
  const handleDelete = () => {
    setFile(null);
    setNotFollowingBack([]);
    setFans([]);
    setPendingRequests([]);
    setShowResults(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Instagram Follower Analysis
        </h1>
        <p className="text-gray-600">
          Upload your Instagram data to analyze your followers
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {/* Conditional rendering: Show the upload area if no file is selected. */}
        {!file ? (
          <div className="space-y-4">
            {/* The Dropzone Area */}
            <div 
              // Dynamically change styles when a file is dragged over.
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[var(--color-primary)] bg-violet-50'
                  : 'border-gray-300 hover:border-[var(--color-primary)]'
              }`}
              // Attach all necessary event handlers for both click and drag-and-drop.
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <svg
                className="mx-auto h-12 w-12 text-[var(--color-primary)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium text-[var(--color-primary)]">
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Instagram data export ZIP file only
              </p>
            </div>
            
            {/* The actual file input is hidden but triggered programmatically by the div's onClick. */}
            <input
              type="file"
              accept=".zip"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          // Otherwise, show the selected file and the "Analyze" button.
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 overflow-hidden">
                <svg
                  className="h-5 w-5 text-[var(--color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-800 truncate">
                  {file.name}
                </span>
              </div>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Remove file"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <button
              onClick={processFile}
              disabled={loading}
              className={`w-full flex justify-center items-center py-2.5 px-4 rounded-lg cursor-pointer text-white font-medium transition-colors ${
                loading
                  ? 'bg-[var(--color-primary)] cursor-not-allowed'
                  : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90'
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? 'Analyzing...' : 'Analyze Followers'}
            </button>
          </div>
        )}

        {/* Display error messages if any exist. */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Conditionally render the results list only when processing is complete. */}
      {showResults && !loading && (
        <div ref={resultsRef} className="mt-8 animate-fade-in">
          <ResultsList 
            unfollowers={notFollowingBack} 
            fans={fans} 
            pendingRequests={pendingRequests}
          />
        </div>
      )}

      {/* Show tutorial link when results are not yet visible. */}
      {!showResults && (
        <div className="mt-8 flex gap-2 bg-[var(--color-primary)]/10 p-3 rounded-lg border border-[var(--color-primary)]/20 text-[var(--color-primary)]">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 
              12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 
              21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 
              3 12C3 16.9706 7.02944 21 12 21ZM12.75 15V16.5H11.25V15H12.75ZM10.5 10.4318C10.5 
              9.66263 11.1497 9 12 9C12.8503 9 13.5 9.66263 13.5 10.4318C13.5 10.739 13.3151 
              11.1031 12.9076 11.5159C12.5126 11.9161 12.0104 12.2593 11.5928 12.5292L11.25 
              12.7509V14.25H12.75V13.5623C13.1312 13.303 13.5828 12.9671 13.9752 12.5696C14.4818 
              12.0564 15 11.3296 15 10.4318C15 8.79103 13.6349 7.5 12 7.5C10.3651 7.5 9 8.79103 
              9 10.4318H10.5Z"
            />
          </svg>
          <p>For tutorial <span className="underline cursor-pointer" onClick={() => navigate('/tutorial')}>Click Here</span></p>
        </div>
      )}
    </div>
  );
}