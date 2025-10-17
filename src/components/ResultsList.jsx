import React, { useState, useMemo } from "react";

// A simple, reusable icon component that shows a checkmark when `copied` is true.
const CopyIcon = ({ copied }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" />
        )}
    </svg>
);


/**
 * A custom React hook for handling copy-to-clipboard functionality.
 * It provides a `copy` function and a `copied` state that automatically resets.
 * @returns {[boolean, function(string): void]} A tuple containing the copied state and the copy function.
 */
const useCopyToClipboard = () => {
    // State to track if text has just been copied.
    const [copied, setCopied] = useState(false);

    const copy = (text) => {
        // Use the browser's native Clipboard API to write text.
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            // Important: Reset the 'copied' state after 2 seconds for UI feedback.
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return [copied, copy];
};

/**
 * The main component responsible for displaying the analysis results in tabs.
 * @param {{unfollowers: string[], fans: string[], pendingRequests: string[]}} props - The lists of users.
 */
export default function ResultsList({ unfollowers, fans, pendingRequests }) {
  // State to manage which tab ('unfollowers', 'fans', 'pending') is currently active.
  const [activeTab, setActiveTab] = useState("unfollowers");
  // State to hold the user's input from the search bar.
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedAll, copyAll] = useCopyToClipboard();

  const handleCopyAll = (users) => {
      const textToCopy = users.join('\n');
      copyAll(textToCopy);
  };

  /**
   * useMemo is a crucial performance optimization. It caches the result of filtering the lists.
   * The filtering logic only re-runs if one of the dependencies (`unfollowers`, `fans`, `pendingRequests`, `searchTerm`) changes.
   * This prevents unnecessary re-filtering on every single render.
   */
  const lists = useMemo(() => ({
    unfollowers: unfollowers.filter(u => u.toLowerCase().includes(searchTerm.toLowerCase())),
    fans: fans.filter(u => u.toLowerCase().includes(searchTerm.toLowerCase())),
    pending: pendingRequests.filter(u => u.toLowerCase().includes(searchTerm.toLowerCase())),
  }), [unfollowers, fans, pendingRequests, searchTerm]);

  // Determines which filtered list is currently active based on the activeTab state.
  const activeList = 
    activeTab === "unfollowers" ? lists.unfollowers :
    activeTab === "fans" ? lists.fans :
    lists.pending;

  // Gets the length of the *original*, unfiltered list for the current tab.
  const originalListLength = 
    activeTab === "unfollowers" ? unfollowers.length :
    activeTab === "fans" ? fans.length :
    pendingRequests.length;

  /**
   * A helper function to render the content of a list.
   * It handles three different states:
   * 1. The list is completely empty.
   * 2. The list has items, but the search term found no matches.
   * 3. The list has items to display.
   */
  const renderList = (users, type) => {
    // State 1: No users in the original list.
    if (originalListLength === 0) {
      return (
        <div className="text-center py-16 px-6">
          <div className="inline-block p-4 bg-green-100 rounded-full">
            <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">All Good Here!</h3>
          <p className="text-gray-500 mt-1">
            {type === "unfollowers" ? "Everyone you follow is following you back." : 
             type === "fans" ? "You're following back all of your fans." :
             "You have no pending follow requests."}
          </p>
        </div>
      );
    }
    
    // State 2: No search results found.
    if (users.length === 0 && searchTerm) {
      return <p className="text-center py-12 text-gray-500">No users found for "{searchTerm}".</p>
    }

    // State 3: Render the list of users.
    return (
      <ul className="divide-y divide-gray-100">
        {users.map((username) => (
          <ListItem key={username} username={username} type={type} />
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-2xl overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          <TabButton title="Not Following Back" count={unfollowers.length} active={activeTab === 'unfollowers'} onClick={() => setActiveTab('unfollowers')} />
          <TabButton title="Fans" count={fans.length} active={activeTab === 'fans'} onClick={() => setActiveTab('fans')} />
          <TabButton title="Pending" count={pendingRequests.length} active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} />
        </nav>
      </div>

      {/* Search and Action Bar */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-2 items-stretch">
            <input
                type="text"
                placeholder={`Search in ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
            <button
                onClick={() => handleCopyAll(activeList)}
                disabled={activeList.length === 0}
                className="flex flex-shrink-0 items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
                <CopyIcon copied={copiedAll} />
                <span className="text-nowrap">{copiedAll ? 'Copied!' : 'Copy All'}</span>
            </button>
        </div>
      </div>

      {/* Scrollable List Container */}
      <div className="max-h-[60vh] overflow-y-auto">
        {/* Conditional rendering to display the correct active list. */}
        {activeTab === "unfollowers"
          ? renderList(lists.unfollowers, "unfollowers")
          : activeTab === "fans" 
          ? renderList(lists.fans, "fans")
          : renderList(lists.pending, "pending")}
      </div>
    </div>
  );
}

/**
 * A reusable component for a single navigation tab.
 */
const TabButton = ({ title, count, active, onClick }) => {
  return (
    <button className={`flex-1 p-3 sm:p-4 text-sm font-medium border-b-2 transition-colors ${active ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={onClick}>
      
      {/* This is a clever responsive trick: show different text based on screen size. */}
      <span className="hidden sm:inline">{title}</span>
      <span className="sm:hidden">{title === 'Not Following Back' ? 'Unfollowers' : title}</span>
      
      {/* Display the count badge only if there are users in the list. */}
      {count > 0 && (
        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${active ? `bg-[var(--color-primary)]/10 text-[var(--color-primary)]` : `bg-gray-200 text-gray-700`}`}>
          {count}
        </span>
      )}
    </button>
  );
};

/**
 * A component that represents a single user row in the list.
 */
const ListItem = ({ username, type }) => {
  const [copied, copy] = useCopyToClipboard();
  
  // This logic robustly handles usernames that start with symbols (e.g., '_username').
  // It finds the first actual letter for the avatar initial.
  const firstLetter = username.replace(/^[^a-zA-Z]+/, '').charAt(0);
  const initial = (firstLetter || '#').toUpperCase(); // Fallback to '#' if no letter is found.
  
  // Dynamically set the avatar background color based on the list type.
  const bgColor = 
    type === "unfollowers" ? "bg-red-400" :
    type === "fans" ? "bg-green-500" :
    "bg-gray-400";

  return (
    <li className="p-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white font-bold text-lg`}>
            {initial}
          </div>
          <span className="font-medium text-gray-800 truncate">{username}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => copy(username)} className="p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <CopyIcon copied={copied} />
            </button>
            <a 
              href={`https://instagram.com/${username}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 rounded-md text-sm font-semibold text-white bg-[var(--color-primary)] hover:bg-opacity-90 transition-colors"
            >
              Profile
            </a>
        </div>
      </div>
    </li>
  );
};