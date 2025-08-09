import React, { useState } from 'react';
import JSZip from 'jszip';
import ResultsList from '../components/ResultsList';

export default function UploadPage() {
  const [notFollowingBack, setNotFollowingBack] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);

      const followersPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/followers_1.json') ||
        path.endsWith('connections/followers_and_following/followers.json')
      );

      const followingPath = Object.keys(loadedZip.files).find(path =>
        path.endsWith('connections/followers_and_following/following.json')
      );

      if (!followersPath || !followingPath) {
        alert('Required JSON files not found in ZIP.');
        setLoading(false);
        return;
      }

      const followersRaw = await loadedZip.files[followersPath].async('string');
      const followingRaw = await loadedZip.files[followingPath].async('string');

      const followersData = JSON.parse(followersRaw);
      const followingData = JSON.parse(followingRaw);

      const followers = followersData.flatMap(item =>
        item.string_list_data.map(entry => entry.value)
      );

      const following = followingData.relationships_following.flatMap(item =>
        item.string_list_data.map(entry => entry.value)
      );

      const notFollowing = following.filter(user => !followers.includes(user));

      setNotFollowingBack(notFollowing);
    } catch (err) {
      alert('Error processing ZIP file.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4 text-center text-[var(--color-primary)]">
        Upload Your Instagram ZIP
      </h1>

      <input
        type="file"
        accept=".zip"
        onChange={handleFileUpload}
        className="mb-6 p-3 border rounded w-full"
      />

      {loading ? (
        <p className="text-center text-gray-600">Processing file...</p>
      ) : (
        <ResultsList users={notFollowingBack} />
      )}
    </div>
  );
}
