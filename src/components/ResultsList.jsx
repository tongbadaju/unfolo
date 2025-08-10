import React, { useState } from "react";

export default function ResultsList({ unfollowers, fans }) {
  const [activeTab, setActiveTab] = useState("unfollowers");

  const tabClasses = (tab) =>
    `inline-block p-4 rounded-t-lg border-b-2 transition-colors duration-200 ${
      activeTab === tab
        ? "border-[var(--color-primary)] text-[var(--color-primary)] font-semibold cursor-pointer"
        : "border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer"
    }`;

  const renderList = (users, type) => {
    if (users.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-4 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-gray-500 max-w-xs">
            {type === "unfollowers"
              ? "Congratulations! Everyone follows you back."
              : "You follow everyone who follows you. Good engagement!"}
          </p>
        </div>
      );
    }

    return (
      <ul className="divide-y divide-gray-200 max-h-150 overflow-y-auto">
        {users.map((username, index) => (
          <li key={index} className="py-3 px-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)]/50 to-[var(--color-primary)] text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="font-medium text-gray-800 truncate flex-1 min-w-0">
                  {username}
                </span>
              </div>

              <div className="flex space-x-2">
                <a
                  href={`https://instagram.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md text-sm font-medium text-white transition-colors duration-200 ${
                    type === "unfollowers"
                      ? "bg-red-400 hover:bg-red-400/80"
                      : "bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80"
                  }`}
                >
                  {type === "unfollowers" ? "Unfollow" : "Follow"}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm w-full max-w-2xl overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            className={`${tabClasses("unfollowers")} flex-1 text-center`}
            onClick={() => setActiveTab("unfollowers")}
          >
            Unfollowers
            {unfollowers.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                {unfollowers.length}
              </span>
            )}
          </button>
          <button
            className={`${tabClasses("fans")} flex-1 text-center`}
            onClick={() => setActiveTab("fans")}
          >
            Fans
            {fans.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                {fans.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      <div>
        {activeTab === "unfollowers"
          ? renderList(unfollowers, "unfollowers")
          : renderList(fans, "fans")}
      </div>
    </div>
  );
}
