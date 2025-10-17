import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import ResultsList from '../components/ResultsList';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const navigate = useNavigate();
  const [notFollowingBack, setNotFollowingBack] = useState([]);
  const [fans, setFans] = useState([]);
  // New state for pending requests
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.zip')) {
      setError('Please select a .zip file');
      e.target.value = '';
      return;
    }
    setFile(selectedFile);
    setShowResults(false);
    setError(null);
  };

  const processFile = async () => {
    if (!file) {
      alert('Please upload a ZIP file first.');
      return;
    }

    setLoading(true);

    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);

      const followersPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/followers_1.json')
      );
      const followingPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/following.json')
      );
      
      // ✅ New: Find the pending requests file (it's optional)
      const pendingRequestsPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/pending_follow_requests.json')
      );

      if (!followersPath || !followingPath) {
        alert('Required files (followers_1.json, following.json) not found in ZIP.');
        setLoading(false);
        return;
      }

      const followersRaw = await loadedZip.files[followersPath].async('string');
      const followingRaw = await loadedZip.files[followingPath].async('string');

      const followersData = JSON.parse(followersRaw);
      const followingData = JSON.parse(followingRaw);

      // ✅ New: Process pending requests if the file exists
      let pendingRequestsList = [];
      if (pendingRequestsPath) {
        const pendingRequestsRaw = await loadedZip.files[pendingRequestsPath].async('string');
        const pendingRequestsData = JSON.parse(pendingRequestsRaw);
        // The structure is nested like the followers file
        pendingRequestsList = pendingRequestsData.relationships_follow_requests_sent.flatMap(item =>
          item.string_list_data.map(entry => entry.value)
        );
      }

      const followers = followersData.flatMap(item =>
        item.string_list_data.map(entry => entry.value)
      );
      
      const following = followingData.relationships_following.map(item => item.title);

      const notFollowing = following.filter(user => !followers.includes(user));
      const fansList = followers.filter(user => !following.includes(user));

      setNotFollowingBack(notFollowing);
      setFans(fansList);
      setPendingRequests(pendingRequestsList); // Set the new state
      setShowResults(true);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      alert('Error processing ZIP file. It might be corrupted or in an unexpected format.');
      console.error(err);
    }

    setLoading(false);
  };

  const handleDelete = () => {
    setFile(null);
    setNotFollowingBack([]);
    setFans([]);
    setPendingRequests([]); // Reset the new state
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
        {/* ... (rest of the JSX is the same as before) ... */}
        {!file ? (
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[var(--color-primary)] transition-colors"
              onClick={() => fileInputRef.current?.click()}
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
            
            <input
              type="file"
              accept=".zip"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
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

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {showResults && !loading && (
        <div ref={resultsRef} className="mt-8 animate-fade-in">
          {/* ✅ Pass the new prop to the results list */}
          <ResultsList 
            unfollowers={notFollowingBack} 
            fans={fans} 
            pendingRequests={pendingRequests}
          />
        </div>
      )}

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