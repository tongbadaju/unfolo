import React, { useState } from "react";

export default function ResultsList({ unfollowers, fans }) {
  const [activeTab, setActiveTab] = useState("unfollowers"); // Tracks which tab is currently active

  // Returns dynamic CSS classes for a tab based on whether it is active
  const tabClasses = (tab) =>
    `inline-block p-4 rounded-t-lg ${
      activeTab === tab
        ? "text-primary bg-gray-100 cursor-pointer text-[var(--color-primary)]"
        : "hover:text-gray-600 hover:bg-gray-50 cursor-pointer"
    }`;

  // Renders a list of usernames for the given type (unfollowers or fans)
  const renderList = (users, type) => {
    if (users.length === 0) {
      // Display a different empty-state message depending on the tab
      return (
        <p className="text-gray-600">
          {type === "unfollowers"
            ? "Everyone follows you back."
            : "You follow everyone who follows you."}
        </p>
      );
    }

    return (
      <ul className="divide-y divide-gray-200">
        {users.map((username, index) => (
          <li
            key={index} // Key based on index (safe here because order won’t change)
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center space-x-3">
              {/* Avatar placeholder with user icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-gray-100 text-[var(--color-primary)]">
                <svg
                  className="w-8 h-8 mt-1"
                  fill="currentColor"
                  viewBox="-1.7 0 20.4 20.4"
                >
                  <path d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"/>
                </svg>
              </div>
              <span className="font-sm">{username}</span>
            </div>

            {/* Opens the user's Instagram profile in a new tab */}
            <a
              href={`https://instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className={`px-3 py-1 rounded text-white cursor-pointer ${
                  type === "unfollowers" ? "bg-red-400" : "bg-[var(--color-primary)]"
                } hover:opacity-90`}
              >
                {type === "unfollowers" ? "Unfollow" : "Follow"}
              </button>
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-9 bg-white rounded w-full max-w-2xl">
      {/* Tabs navigation */}
      <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <li className="me-2">
          <button
            className={tabClasses("unfollowers")}
            onClick={() => setActiveTab("unfollowers")}
          >
            Unfollowers
          </button>
        </li>
        <li className="me-2">
          <button
            className={tabClasses("fans")}
            onClick={() => setActiveTab("fans")}
          >
            Fans
          </button>
        </li>
      </ul>

      {/* Count display for current tab */}
      <div className="mt-3 mb-2 font-semibold text-gray-700">
        {activeTab === "unfollowers"
          ? `${unfollowers.length} users don't follow you back.`
          : `${fans.length} users you don't follow back.`}
      </div>

      {/* List rendering based on active tab */}
      {activeTab === "unfollowers"
        ? renderList(unfollowers, "unfollowers")
        : renderList(fans, "fans")}
    </div>
  );
}
