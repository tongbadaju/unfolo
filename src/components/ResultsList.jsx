import React from 'react'

export default function ResultsList({ users }) {
  if (users.length === 0) {
    return <p className="text-gray-600">No accounts found or all follow you back.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-2">Accounts not following you back:</h2>
      <ul className="list-disc pl-5">
        {users.map(user => (
          <li key={user}>
            <a
              href={`https://instagram.com/${user}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
