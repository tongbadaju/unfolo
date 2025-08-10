import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import ResultsList from '../components/ResultsList';

export default function UploadPage() {
  const [notFollowingBack, setNotFollowingBack] = useState([]);
  const [fans, setFans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);

  // Triggered when a file is selected from the input
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Allow only ZIP files
    if (!selectedFile.name.endsWith('.zip')) {
      alert('Please select a .zip file');
      e.target.value = '';
      return;
    }
    setFile(selectedFile);
    setShowResults(false);
  };

  // Reads and processes the uploaded Instagram ZIP file
  const processFile = async () => {
    if (!file) {
      alert('Please upload a ZIP file first.');
      return;
    }

    setLoading(true);

    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);

      // Locate the followers JSON file inside Instagram’s exported folder structure
      const followersPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/followers_1.json') ||
        path.endsWith('connections/followers_and_following/followers.json')
      );

      // Locate the following JSON file
      const followingPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/following.json')
      );

      if (!followersPath || !followingPath) {
        alert('Required JSON files not found in ZIP.');
        setLoading(false);
        return;
      }

      // Extract file contents as text
      const followersRaw = await loadedZip.files[followersPath].async('string');
      const followingRaw = await loadedZip.files[followingPath].async('string');

      // Parse JSON strings into JS objects
      const followersData = JSON.parse(followersRaw);
      const followingData = JSON.parse(followingRaw);

      // Flatten nested "string_list_data" arrays to get just usernames of followers
      const followers = followersData.flatMap(item =>
        item.string_list_data.map(entry => entry.value)
      );

      // Flatten following list
      const following = followingData.relationships_following.flatMap(item =>
        item.string_list_data.map(entry => entry.value)
      );

      // Users you follow but who don't follow you back
      const notFollowing = following.filter(user => !followers.includes(user));

      // Users who follow you but you don't follow back
      const fansList = followers.filter(user => !following.includes(user));

      setNotFollowingBack(notFollowing);
      setFans(fansList);
      setShowResults(true);

      // Smooth scroll to results section with an offset (to avoid hiding behind fixed elements)
      setTimeout(() => {
        if (resultsRef.current) {
          const elementTop = resultsRef.current.getBoundingClientRect().top + window.scrollY;
          const offset = -80; 
          window.scrollTo({
            top: elementTop + offset,
            behavior: 'smooth',
          });
        }
      }, 20);

    } catch (err) {
      alert('Error processing ZIP file.');
      console.error(err);
    }

    setLoading(false);
  };

  // Resets the state when deleting the uploaded file
  const handleDelete = () => {
    setFile(null);
    setNotFollowingBack([]);
    setFans([]);
    setShowResults(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      <h1 className="mb-8 text-2xl font-semibold text-center text-gray-800">
        Upload Your Instagram ZIP
      </h1>

      {/* File Upload Button */}
      {!file && (
        <>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative flex w-full border border-gray-200 shadow-2xs rounded-lg text-sm cursor-pointer"
          >
            <span className="h-full py-3 px-4 bg-gray-100 whitespace-nowrap">Choose File</span>
            <span className="group grow flex overflow-hidden h-full py-3 px-4">
              <span className="group-has-[div]:hidden">No Chosen File</span>
            </span>
          </button>

          <input
            type="file"
            accept=".zip"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
        </>
      )}

      {/* File name display & action buttons */}
      {file && (
        <>
          <div className="flex pl-4 pr-2 justify-between border rounded-lg border-gray-200 shadow-sm items-center">
            <span className="text-sm py-3 text-gray-800">{file.name}</span>
            <button
              onClick={handleDelete}
              className="rounded-full hover:bg-gray-200 text-gray-400 transition-colors cursor-pointer"
              title="Delete"
            >
              {/* X Icon */}
              <svg
                className="size-5"
                fill="currentColor"
                viewBox="-1.7 0 20.4 20.4"
              >
                <path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-6.804.01 3.032-3.033a.792.792 0 0 0-1.12-1.12L8.494 9.173 5.46 6.14a.792.792 0 0 0-1.12 1.12l3.034 3.033-3.033 3.033a.792.792 0 0 0 1.12 1.119l3.032-3.033 3.033 3.033a.792.792 0 0 0 1.12-1.12z"/>
              </svg>
            </button>
          </div>

          {/* Process File Button */}
          <button
            onClick={processFile}
            disabled={loading}
            type="button"
            className={`mt-4 w-full font-medium justify-center rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer 
              ${loading
                ? 'text-white bg-[var(--color-primary)] cursor-not-allowed'
                : 'text-white bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)]/90'
              }`}
          >
            {loading && (
              // Loading Spinner
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 
                  100.591C22.3858 100.591 0 78.2051 0 
                  50.5908C0 22.9766 22.3858 0.59082 50 
                  0.59082C77.6142 0.59082 100 22.9766 
                  100 50.5908ZM9.08144 50.5908C9.08144 
                  73.1895 27.4013 91.5094 50 91.5094C72.5987 
                  91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 
                  27.9921 72.5987 9.67226 50 9.67226C27.4013 
                  9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 
                  35.9116 97.0079 33.5539C95.2932 28.8227 
                  92.871 24.3692 89.8167 20.348C85.8452 
                  15.1192 80.8826 10.7238 75.2124 
                  7.41289C69.5422 4.10194 63.2754 
                  1.94025 56.7698 1.05124C51.7666 
                  0.367541 46.6976 0.446843 41.7345 
                  1.27873C39.2613 1.69328 37.813 
                  4.19778 38.4501 6.62326C39.0873 
                  9.04874 41.5694 10.4717 44.0505 
                  10.1071C47.8511 9.54855 51.7191 
                  9.52689 55.5402 10.0491C60.8642 
                  10.7766 65.9928 12.5457 70.6331 
                  15.2552C75.2735 17.9648 79.3347 
                  21.5619 82.5849 25.841C84.9175 
                  28.9121 86.7997 32.2913 88.1811 
                  35.8758C89.083 38.2158 91.5421 
                  39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {loading ? 'Processing...' : 'Discover Unfollowers'}
          </button>
        </>
      )}

      {/* Results */}
      {showResults && !loading && (
        <div ref={resultsRef} className="mt-8">
          <ResultsList unfollowers={notFollowingBack} fans={fans} />
        </div>
      )}
    </div>
  );
}
